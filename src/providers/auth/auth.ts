import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import firebase from "firebase";

@Injectable()
export class AuthProvider {

  firedata = firebase.database().ref('/customers');
  versionRef = firebase.database().ref('/version');

  // public employeeListRef: Reference;
  // authState: any;
  constructor(public events: Events) {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.employeeListRef = firebase.database().ref(`customers`);

    //   }
    // });
  }

  // getEmployeeList(): Reference {
  //   return this.employeeListRef;
  // }

  // getEmployeeDetail(userId: string): Reference {
  //   return this.employeeListRef.child(userId);
  // }

  login(loginParams) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(loginParams.email, loginParams.password).then((user) => {
        if (user.emailVerified) {
          resolve(true);
        } else {
          this.SendVerificationMail();
          resolve(false);
        }
        // this.updateuser();
      }).catch((err) => {
        reject(err);
      })
    })

    return promise;
  }

  updateuser(updateUser: any) {
    var promise = new Promise((resolve, reject) => {
      var user = firebase.auth().currentUser.uid;

      this.firedata.child(user).update({
        address: updateUser.address,
        email: updateUser.email,
        mobile: updateUser.mobile,
        name: updateUser.name

      }).then(() => {
        resolve({ success: true });
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

          this.firedata.child(firebase.auth().currentUser.uid).set({
            name: userObj.name,
            address: userObj.address,
            // trade: userObj.trade,
            email: userObj.email,
            mobile: userObj.mobile,
            bisTypeId: userObj.bisTypeId,
            perentBisId: userObj.perentBisId,
            userId: firebase.auth().currentUser.uid
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
          resolve({ success: true });
        })
        .catch(err => {
          reject(err);
        });
    })
    return promise;
  }

  registerVendor(userObj: any) {
    var uid = firebase.auth().currentUser.uid;
    var promise = new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .then(() => {

          this.SendVerificationMail();

          this.firedata.child(firebase.auth().currentUser.uid).set({
            name: userObj.name,
            address: userObj.address,
            email: userObj.email,
            mobile: userObj.mobile,
            bisTypeId: userObj.bisTypeId,
            perentBisId: uid,
            userId: firebase.auth().currentUser.uid
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
          resolve({ success: true });
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

  getupdatedetails(version) {
    return this.versionRef.orderByChild('status').equalTo(1).once('value').then(function (snap) {
      if (snap.val()) {
        return snap.val();
      }
    });
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
