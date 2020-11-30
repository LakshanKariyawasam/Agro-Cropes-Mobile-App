import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';
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
  oldsurplusDetails: any[];
  statusChange: any;
  surplusCnt: number = 0;
  oldsurplusCnt: number;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, private loadingCtrl: LoadingController, private orderService: OrderProvider, public events: Events) {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.statusChange = 'currunt';
  }

  ionViewDidLoad() {
    this.events.unsubscribe('surplusDetailsLoaded');
    this.events.unsubscribe('oldsurplusDetailsLoaded');
  }

  ionViewWillEnter() {
    this.getSurplusDetails();
    this.getOldSurplusDetails();
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
      this.surplusDetails = this.orderService.surplusDetails;
      this.surplusCnt = this.surplusDetails.length;
      console.log("surplusDetails::: ", this.surplusDetails)
      console.log("surplusCnt::: ", this.surplusCnt)
      loader.dismiss();
    })
  }

  getOldSurplusDetails() {
    let loader = this.loadingCtrl.create({
      content: 'Loading surplus..'
    });
    loader.present();

    this.orderService.getOldSurplusDetails(this.user.userId);
    this.events.subscribe('oldsurplusDetailsLoaded', () => {
      this.oldsurplusDetails = this.orderService.oldsurplusDetails;
      this.oldsurplusCnt = this.oldsurplusDetails.length;
      console.log("oldsurplusDetailsLoaded::: ", this.oldsurplusDetails)
      loader.dismiss();
    })
  }

  rejectOrder() {
    let loader = this.loadingCtrl.create({
      content: 'Rejecting order..'
    });
    loader.present();
    this.surplusDetails.forEach(element => {
      this.orderService.rejectSurplusOrder(element).then(() => {
        this.presentAlert("Order Reject Sucsessfully.");
        loader.dismiss();
      });
    });
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: message,
      buttons: ['Close']
    });

    alert.onDidDismiss(res => {
      this.navCtrl.pop();
    });
    alert.present();
  }

}
