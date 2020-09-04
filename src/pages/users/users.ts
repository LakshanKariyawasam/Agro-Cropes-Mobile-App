import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  userId: any;
  customers: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
    private userService: UserProvider, public events: Events, public alertCtrl: AlertController) {
    this.userId = JSON.parse(window.localStorage.getItem('user')).userId;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  ionViewWillEnter() {
    this.getusers();
  }

  addNewUser() {
    this.navCtrl.push('UserDetailsPage');
  }

  getusers() {
    let loader = this.loadingCtrl.create({
      content: 'Loading users..'
    });
    loader.present();

    this.userService.getUserListByPerentUser(this.userId);
    this.events.subscribe('customersLoaded', () => {
      this.customers = this.userService.customers;
      console.log("user List", this.customers)
      loader.dismiss();
    });
  }

  removeUser() {
    let alertRemoval = this.alertCtrl.create({
      title: 'Confirm removel',
      message: 'Do you want to remove this vendor?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            let loader = this.loadingCtrl.create({
              content: 'Removing vendor..'
            });
            loader.present();
            this.userService.removeUser().then(() => {
              loader.dismiss();
            }).catch(err => {
              alert(JSON.stringify(err));
            });
          }
        }
      ]
    });
    alertRemoval.present();
  }
}
