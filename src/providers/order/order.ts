import { Injectable } from "@angular/core";
import firebase from "firebase";

@Injectable()
export class OrderProvider {
  firedata = firebase.database().ref("/orders");
  orderDetails = firebase.database().ref("/ordersdetails");
  constructor() { }

  placeOrder(orderObj: any) {
    var promise = new Promise((resolve, reject) => {
      let orderRef = this.makeid(10)
      let orderObject = {
        orderRef: orderRef,
        userId: orderObj.userId,
        totalCount: orderObj.count,
        dateInserted: firebase.database.ServerValue.TIMESTAMP
      };
      //console.log('orderObject',orderObject);
      this.firedata.push(orderObject).then(() => {
        orderObj.orders.forEach((v, indx) => {
          //console.log(v);
          this.orderDetails.push({
            orderRef: orderRef,
            productName: v.name,
            qty: v.count
          }).then(() => {
            resolve(true);
          })
        });
      })

    });
    return promise;
  }

  makeid(lenght: number) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < lenght; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
