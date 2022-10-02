import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DBServiceService {

  constructor(private fireStore: Firestore) { }


  public getOrders() {
    let ref = collection(this.fireStore, 'orders')
    return collectionData(ref)
  }

  public getCustomerDetail(){
    let ref = collection(this.fireStore, 'customers')
    return collectionData(ref)
  }

  public getProducts(){
    let ref = collection(this.fireStore, 'products')
    return collectionData(ref)
  }
}
