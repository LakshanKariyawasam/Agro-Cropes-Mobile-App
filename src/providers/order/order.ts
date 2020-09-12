import { Injectable } from "@angular/core";
import firebase from "firebase";
import { Events } from "ionic-angular";

@Injectable()
export class OrderProvider {
  orderRef = firebase.database().ref("orders");
  orderDetails = firebase.database().ref("ordersdetails");
  customerRef = firebase.database().ref('customers');
  photoRef = firebase.storage().ref();


  surplusRef = firebase.database().ref('surplus');
  surplusDetailsRef = firebase.database().ref('surplusDetails');


  customers: Array<any> = [];
  orders: Array<any> = [];
  acceptorders: Array<any> = [];
  rejectorders: Array<any> = [];
  pendingorders: Array<any> = [];
  ordersDetails: Array<any> = [];
  surplusDetails: Array<any> = [];
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

  getPendingOrderListByUserFirst(perentBisId) {
    this.customerRef.orderByChild('perentBisId').equalTo(perentBisId).once('value', (snap) => {
      this.customers = [];
      this.pendingorders = [];
      if (snap.val()) {
        var tempCustomers = snap.val();
        for (var key in tempCustomers) {
          let singleCustomer = {
            id: key,
            address: tempCustomers[key].address,
            email: tempCustomers[key].email,
            mobile: tempCustomers[key].mobile,
            name: tempCustomers[key].name,
            perentBisId: tempCustomers[key].perentBisId,
            userId: tempCustomers[key].userId
          };

          this.orderRef.orderByChild('userId').equalTo(singleCustomer.userId).once('value', (snap) => {

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
                    userName: singleCustomer.name,
                    mobile: singleCustomer.mobile,
                    userId: tempOrders[key].userId
                  };
                  this.pendingorders.push(singleOrder);
                }
              }
            }
            this.events.publish('pendingOrderLoadedFirst');
          })
        }
      }
    })
  }

  getPendingOrderListByUser(perentBisId) {
    this.customerRef.orderByChild('perentBisId').equalTo(perentBisId).once('value', (snap) => {
      this.customers = [];
      this.pendingorders = [];
      if (snap.val()) {
        var tempCustomers = snap.val();
        for (var key in tempCustomers) {
          let singleCustomer = {
            id: key,
            address: tempCustomers[key].address,
            email: tempCustomers[key].email,
            mobile: tempCustomers[key].mobile,
            name: tempCustomers[key].name,
            perentBisId: tempCustomers[key].perentBisId,
            userId: tempCustomers[key].userId
          };

          this.orderRef.orderByChild('userId').equalTo(singleCustomer.userId).once('value', (snap) => {

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
                    userName: singleCustomer.name,
                    mobile: singleCustomer.mobile,
                    userId: tempOrders[key].userId
                  };
                  this.pendingorders.push(singleOrder);
                }
              }
            }
            this.events.publish('pendingOrderLoaded');
            this.events.publish('countOrders');
          })
        }
      }
    })
  }

  getAcceptOrderListByUser(perentBisId) {
    this.customerRef.orderByChild('perentBisId').equalTo(perentBisId).once('value', (snap) => {
      this.customers = [];
      this.acceptorders = [];
      if (snap.val()) {
        var tempCustomers = snap.val();
        for (var key in tempCustomers) {
          let singleCustomer = {
            id: key,
            address: tempCustomers[key].address,
            email: tempCustomers[key].email,
            mobile: tempCustomers[key].mobile,
            name: tempCustomers[key].name,
            perentBisId: tempCustomers[key].perentBisId,
            userId: tempCustomers[key].userId
          };

          this.orderRef.orderByChild('userId').equalTo(singleCustomer.userId).once('value', (snap) => {
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
                    userName: singleCustomer.name,
                    mobile: singleCustomer.mobile,
                    userId: tempOrders[key].userId
                  };
                  this.acceptorders.push(singleOrder);
                }
              }
            }
            this.events.publish('acceptOrderLoaded');
          })
        }
      }
    })
  }

  getRejectOrderListByUser(perentBisId) {
    this.customerRef.orderByChild('perentBisId').equalTo(perentBisId).once('value', (snap) => {
      this.customers = [];
      this.rejectorders = [];
      if (snap.val()) {
        var tempCustomers = snap.val();
        for (var key in tempCustomers) {
          let singleCustomer = {
            id: key,
            address: tempCustomers[key].address,
            email: tempCustomers[key].email,
            mobile: tempCustomers[key].mobile,
            name: tempCustomers[key].name,
            perentBisId: tempCustomers[key].perentBisId,
            userId: tempCustomers[key].userId
          };

          this.orderRef.orderByChild('userId').equalTo(singleCustomer.userId).once('value', (snap) => {

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
                    userName: singleCustomer.name,
                    mobile: singleCustomer.mobile,
                    userId: tempOrders[key].userId
                  };
                  this.rejectorders.push(singleOrder);
                }
              }
            }
            this.events.publish('rejectOrderLoaded');
          })
        }
      }
    })
  }

  getOrderListByUser(user) {
    this.orderRef.orderByChild('userId').equalTo(user.userId).once('value', (snap) => {
      this.orders = [];
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
            this.orders.push(singleOrder);
          }
        }
      }
      this.events.publish('ordersLoaded');
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

  getSurplusDetails(userId) {
    this.surplusRef.orderByChild('userId').equalTo(userId).once('value', (snap) => {
      this.surplusDetails = [];
      if (snap.val()) {
        var tempSurplusDetails = snap.val();
        for (var key in tempSurplusDetails) {
          if (tempSurplusDetails[key].acceptStatus == 0) {
            let singleOrder = {
              id: key,
              productName: tempSurplusDetails[key].productName,
              qty: tempSurplusDetails[key].qty,
              thumb: tempSurplusDetails[key].thumb
            };
            this.surplusDetails.push(singleOrder);
          }
        }
      }
      this.events.publish('surplusDetailsLoaded');
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

  acceptSurpluseOrder(qty: number, order: any, userId: any) {
    var promise = new Promise((resolve, reject) => {
      let availableQty = order.qty - qty;
      if (availableQty == 0) {
        firebase.database().ref('surplus/' + order.id + '/acceptStatus').set(1).then(() => {
          firebase.database().ref('surplus/' + order.id + '/qty').set(availableQty).then(() => {
            let surplusObject = {
              userId: userId,
              productName: order.productName,
              qty: qty,
              thumb: order.thumb,
              dateInserted: new Date().toLocaleDateString()
            };
            this.surplusDetailsRef.push(surplusObject).then(() => {
              resolve({ success: true });
            })
          })
        })
      } else {
        firebase.database().ref('surplus/' + order.id + '/qty').set(availableQty).then(() => {
          let surplusObject = {
            userId: userId,
            productName: order.productName,
            qty: qty,
            thumb: order.thumb,
            dateInserted: new Date().toLocaleDateString()
          };
          this.surplusDetailsRef.push(surplusObject).then(() => {
            resolve({ success: true });
          })
        })
      }
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
