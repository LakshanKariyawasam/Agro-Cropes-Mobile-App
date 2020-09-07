import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the SurplusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-surplus',
  templateUrl: 'surplus.html',
})
export class SurplusPage {

  user: any;
  surplusDetails: any[];
  statusChange: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private orderService: OrderProvider, public events: Events) {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.statusChange = 'currunt';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurplusPage');
  }

  ionViewWillEnter() {
    this.getSurplusDetails();
  }

  addVegiSurplus() {
    this.navCtrl.push("StorePage", { val: 'Surplus Vegitable' });
  }

  getSurplusDetails() {
    let loader = this.loadingCtrl.create({
      content: 'Loading surplus..'
    });
    loader.present();

    this.orderService.getSurplusDetails(this.user.userId);
    this.events.subscribe('surplusDetailsLoaded', () => {
      this.surplusDetails = this.orderService.ordersDetails;

      loader.dismiss();
    })
  }

}
