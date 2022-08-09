import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GetTransactionBill } from 'src/modals/getTransactionBill';

@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.css']
})
export class BillingPageComponent implements OnInit {
  baseUrl = "http://192.168.0.102:8080/api/v1/bill"
  billUrl: any;

  public response!: GetTransactionBill;

  @ViewChild('billSection', { static: false })
  private billSection !: ElementRef

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.billUrl = this.activatedRoute.snapshot.paramMap.get("billUrl")
    this.billPageLoad()
  }

  billPageLoad() {
    this.http.get<GetTransactionBill>(this.baseUrl + "/" + this.billUrl)
      .subscribe({
        next: (response) => {
          this.response = <GetTransactionBill>response;
        }, error: (err) => {
          this.route.navigate(["/billnotfound"])
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

      let pdf = new jsPDF('p', 'px', [canvas.width, canvas.height],true);

      

      pdf.addImage(contentDataURL, 'JPEG', 20, 0, pdf.internal.pageSize.width-40, pdf.internal.pageSize.height)

      let customerId = this.response.customerDetails.id
      let orderId = this.response.orderDetails.id
      let deliveryDate = this.response.orderDetails.deliveredDate;
      pdf.save(orderId + "_" + customerId + "_" + deliveryDate)
    })

  }
}
