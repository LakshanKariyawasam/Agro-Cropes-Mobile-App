import { Injectable } from "@angular/core";
import firebase from "firebase";
import { Events } from "ionic-angular";

@Injectable()
export class OrderProvider {
  orderRef = firebase.database().ref("orders");
  orderDetails = firebase.database().ref("ordersdetails");
  photoRef = firebase.storage().ref();

  acceptorders: Array<any> = [];
  rejectorders: Array<any> = [];
  pendingorders: Array<any> = [];
  ordersDetails: Array<any> = [];
  a: number;
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

  change() {
    this.a = 1;
  }

  getPendingOrderListByUser(user) {
    this.orderRef.orderByChild('userId').equalTo(user.userId).once('value', (snap) => {
      if (this.a == 1) {
        this.pendingorders = [];
        this.a++;
      }

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
            this.pendingorders.push(singleOrder);
          }
        }
      }
      this.events.publish('pendingOrderLoaded');
    })
  }

  getAcceptOrderListByUser(user) {
    this.orderRef.orderByChild('userId').equalTo(user.userId).once('value', (snap) => {
      if (this.a == 1) {
        this.acceptorders = [];
        this.a++;
      }

      if (snap.val()) {
        var tempOrders = snap.val();
        for (var key in tempOrders) {
          if (tempOrders[key].acceptStatus == 1) {
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
            this.acceptorders.push(singleOrder);
          }
        }
      }
      this.events.publish('acceptOrderLoaded');
    })
  }

  getRejectOrderListByUser(user) {
    this.orderRef.orderByChild('userId').equalTo(user.userId).once('value', (snap) => {
      if (this.a == 1) {
        this.rejectorders = [];
        this.a++;
      }

      if (snap.val()) {
        var tempOrders = snap.val();
        for (var key in tempOrders) {
          if (tempOrders[key].acceptStatus == 3) {
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
            this.rejectorders.push(singleOrder);
          }
        }
      }
      this.events.publish('rejectOrderLoaded');
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

  acceptOrder(order: any) {
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('orders/' + order.id + '/acceptStatus').set(1).then(() => {
        resolve(true);
      })
    });
    return promise;
  }

  rejectOrder(order: any) {
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('orders/' + order.id + '/acceptStatus').set(3).then(() => {
        resolve(true);
      })
    });
    return promise;
  }
}
