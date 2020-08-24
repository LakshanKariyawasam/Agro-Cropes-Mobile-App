import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  userData = { "address": "", "bisTypeId": "", "email": "", "mobile": "", "name": "", "perentBisId": "" }

  constructor(public authProvider: AuthProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    this.userData = JSON.parse(window.localStorage.getItem('user'));
    console.log("userData ::: ", this.userData)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  updateUser(){
    this.authProvider.updateuser(this.userData);
  }

}
