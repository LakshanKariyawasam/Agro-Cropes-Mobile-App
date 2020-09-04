import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public events: Events, public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }


  customerRef = firebase.database().ref('customers');
  mdecodeRef = firebase.database().ref('mdecode');

  customers: Array<any> = [];

  getUserListByPerentUser(perentBisId) {
    this.customerRef.orderByChild('perentBisId').equalTo(perentBisId).once('value', (snap) => {
      this.customers = [];
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

          this.customers.push(singleCustomer);
        }
      }
      this.events.publish('customersLoaded');
    })
  }

  removeUser() {
    var user = firebase.auth().currentUser.uid;

    var promise = new Promise((resolve, reject) => {
      firebase.auth().currentUser.delete().then(() => {
        this.customerRef.child(user).remove();
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    })

    return promise;
  }

  getwtcRef() {
    return this.mdecodeRef.orderByChild('wtcRef').once('value').then(function (snap) {
      if (snap.val()) {
        return snap.val().wtcRef;
      }
    });
  }

}
