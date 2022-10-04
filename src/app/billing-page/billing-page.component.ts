import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Order } from 'src/modals/Order';
import { DBServiceService } from '../service/dbservice.service';
import { Customer } from 'src/modals/Customer';

@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.css']
})
export class BillingPageComponent implements OnInit {
  billUrl: any;

  public orderResponse !: Order;
  public customerResponse !: Customer
  public products: any = [];

  public response!: any;

  @ViewChild('billSection', { static: false })
  private billSection !: ElementRef

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private route: Router,
    private db: DBServiceService) { }

  ngOnInit(): void {
    this.billUrl = this.activatedRoute.snapshot.paramMap.get("billUrl")
    this.billPageLoad()
  }

  billPageLoad() {
    this.db.getProducts().subscribe({
      next: (resp) => {
        this.products = resp
      }
    })

    this.db.getOrders().subscribe({
      next: (response) => {
        let order = <Order[]><unknown>response
        let isOrder = order.filter(e => {
          return e.billUrl == this.billUrl
        });
        if (isOrder.length == 0) {
          this.route.navigate(["/billnotfound"])
        } else {

          this.orderResponse = isOrder[0]

          this.db.getCustomerDetail().subscribe({
            next: (response) => {
              let customers = <Customer[]>response
              let customer = customers.filter(cust => {
                return cust.id == this.orderResponse.customerId
              })

              if (customer.length == 0) {
                this.route.navigate(["/billnotfound"])
              } else {
                this.customerResponse = customer[0];
              }
            }
          })
        }
      }
    })
  }

  public getProductRate(price: any, count: any) {
    return price / count
  }

  getFormattedDate(date: any) {
    return date.replace(" ", "<br>")
  }

  downloadThisBill() {

    html2canvas(this.billSection.nativeElement).then(canvas => {
      var imgHeight = canvas.height * 208 / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')

      let pdf = new jsPDF('p', 'px', [canvas.width, canvas.height], true);



      pdf.addImage(contentDataURL, 'JPEG', 20, 0, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height)

      let customerId = this.customerResponse.id
      let orderId = this.orderResponse.id
      let deliveryDate = this.orderResponse.deliveredDate
      pdf.save(orderId + "_" + customerId + "_" + deliveryDate)
    })

  }

  public getProductName(id: any) {
    return this.products.filter((p: any) => {
      return p.productId == id
    })[0].productName
  }
}
