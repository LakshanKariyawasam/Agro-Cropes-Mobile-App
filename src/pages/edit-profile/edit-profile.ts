import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  userData = { "address": "", "bisTypeId": "", "email": "", "mobile": "", "name": "", "perentBisId": "" }

  constructor(public authProvider: AuthProvider, public toastCtrl: ToastController,
    private events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.userData = JSON.parse(window.localStorage.getItem('user'));
    console.log("userData ::: ", this.userData)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  updateUser() {
    if (this.authProvider.updateuser(this.userData)) {
      window.localStorage.removeItem('user');
      window.localStorage.setItem('user', JSON.stringify(this.userData));

      let toast = this.toastCtrl.create({
        message: `User Update Success`,
        showCloseButton: true,
        duration: 1000
      });
      toast.present();

      this.events.publish('user:login');
    }
  }

}
