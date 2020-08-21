import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import firebase from "firebase";
import { Reference, ThenableReference } from 'firebase/database';
@Injectable()
export class AuthProvider {
 
  firedata = firebase.database().ref('/customers');
  public employeeListRef: Reference;
  authState: any;
  constructor(public events: Events) {firebase.auth().onAuthStateChanged(user => {
    if (user) {
      this.employeeListRef = firebase.database().ref(`customers`);
     
    }
  });
}
getEmployeeList(): Reference {
  return this.employeeListRef;
}
getEmployeeDetail(userId: string): Reference {
  return this.employeeListRef.child(userId);
}
  login(loginParams) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(loginParams.email, loginParams.password).then(() => {
        this.getuserdetails();
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    })

    return promise;
  }

  registerUser(userObj: any) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .then(() => {

          this.SendVerificationMail();

          // this.firedata.child(firebase.auth().currentUser.uid).set({
          //   name: userObj.name,
          //   address: userObj.address,
          //   trade: userObj.trade,
          //   email: userObj.email,
          //   mobile: userObj.mobile
          // }).then(() => {
          //   resolve({ success: true });
          // }).catch((err) => {
          //   reject(err);
          // })
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    })
    return promise;
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().currentUser.sendEmailVerification().then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    })

    return promise;
  }

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
  

  sendPasswordResetEmail(email) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    })

    return promise;
  }
}
