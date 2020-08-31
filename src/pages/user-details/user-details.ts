import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the UserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
  signupform: FormGroup;
  pic: any;
  name: any;
  address: any;
  trade: any;
  email: any;
  mobile: any;
  password: any;
  constructor(
    public navCtrl: NavController,
    public AuthService: AuthProvider,
    public menu: MenuController,
    private loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController
  ) {
    this.menu.swipeEnable(false);
  }

  ngOnInit() {
    this.signupform = new FormGroup({
      pic: new FormControl(),
      name: new FormControl(),
      address: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.minLength(4), Validators.maxLength(30)]),
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^([9]{1})([234789]{1})([0-9]{9})$/), Validators.minLength(11), Validators.maxLength(11)])
    });
  }

  ionViewDidLoad() { }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Auth Success',
      subTitle: message,
      buttons: ['Close']
    });
    
    alert.onDidDismiss(res => {
      this.navCtrl.pop();
      this.navCtrl.push('UsersPage');
    });
    alert.present();
  }

  register() {
    let loader = this.loadingCtrl.create({
      content: 'Registering..'
    });
    loader.present();

    var userObj = {
      name: this.name,
      address: this.address,
      email: this.email,
      mobile: this.mobile,
      password: '123456',
      bisTypeId: 3
    };
    // loader.dismiss();
    // // var picture = this.pic;
    // // picURL.picture.upload(picture, "my-folder")
    // //   .then(function (fileURL) {
    // //     console.log("File successfully uploaded. Path to download: " + fileURL.fileURL);
    // //     picURL = fileURL.fileURL;
    // //   })
    // // picURL.picture = picURL;

    this.AuthService.registerVendor(userObj)
      .then((response: any) => {
        if (response.success == true) {
          loader.dismiss();
          this.presentAlert("Vendor Creation Sucsessfully, An activation link has been sent to vendor registered email");
        }
      })
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }
}
