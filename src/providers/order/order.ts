import { Injectable } from "@angular/core";
import firebase from "firebase";
import { Events } from "ionic-angular";

@Injectable()
export class OrderProvider {
  orderRef = firebase.database().ref("orders");
  orderDetails = firebase.database().ref("ordersdetails");
  photoRef = firebase.storage().ref();

  orders: Array<any> = [];
  ordersDetails: Array<any> = [];
  constructor(public events: Events) { }

  placeOrder(orderObj: any) {
    var promise = new Promise((resolve, reject) => {
      let orderRef = this.makeid(10)
      let orderObject = {
        orderRef: orderRef,
        acceptStatus: 0,
        userId: orderObj.userId,
        userName: orderObj.name,
        totalCount: orderObj.count,
        dateInserted: new Date().toLocaleDateString()
      };
      //console.log('orderObject',orderObject);
      this.orderRef.push(orderObject).then(() => {
        orderObj.orders.forEach((v, indx) => {
          console.log("thumb :: ", v);
          this.orderDetails.push({
            orderRef: orderRef,
            productName: v.name,
            thumb: v.thumb,
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

  clear() {
    this.orders = [];
  }

  getOrderListByUser(user) {
    this.orderRef.orderByChild('userId').equalTo(user.userId).once('value', (snap) => {
      if (snap.val()) {
        var tempOrders = snap.val();
        for (var key in tempOrders) {
          if (tempOrders[key].acceptStatus == 0) {
            let singleOrder = {
              id: key,
              acceptStatus: tempOrders[key].acceptStatus,
              dateInserted: tempOrders[key].dateInserted,
              orderRef: tempOrders[key].orderRef,
              totalCount: tempOrders[key].totalCount,
              userName: user.name,
              mobile: user.mobile,
              userId: tempOrders[key].userId
            };
            this.orders.push(singleOrder);
          }
        }
      }
      this.events.publish('orderLoaded');
    })
  }

  getOrderDetailsByOrder(order) {
    this.orderDetails.orderByChild('orderRef').equalTo(order.orderRef).once('value', (snap) => {
      this.ordersDetails = [];
      if (snap.val()) {
        var tempOrderDetails = snap.val();
        for (var key in tempOrderDetails) {
          let singleOrder = {
            id: key,
            productName: tempOrderDetails[key].productName,
            qty: tempOrderDetails[key].qty,
            thumb: tempOrderDetails[key].thumb
          };
          this.ordersDetails.push(singleOrder);
        }
      }
      this.events.publish('orderDetailsLoaded');
    });
  }

}
