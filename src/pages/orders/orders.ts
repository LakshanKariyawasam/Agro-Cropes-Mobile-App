import { Component } from '@angular/core';
import { Events, IonicPage, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {


  userId: any;
  pendingorders: any[] = [];
  ordersDetails: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController, private orderService: OrderProvider, public events: Events) {
    this.userId = JSON.parse(window.localStorage.getItem('user')).userId;

    this.events.subscribe('user:tab', () => {

      console.log("userId::: ", this.userId);
      if (JSON.parse(window.localStorage.getItem('user')).bisTypeId == 2) {
        this.getorders();
        console.log("userId::: ", this.userId);
      }
    });
  }

  ionViewWillEnter() {
    this.getorders();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('pendingOrderLoaded');
  }

  ionViewWillLeave() {

  }

  getorders() {
    let loader = this.loadingCtrl.create({
      content: 'Loading orders..'
    });
    loader.present();

    this.orderService.getPendingOrderListByUser(this.userId);
    this.events.subscribe('pendingOrderLoaded', () => {
      this.pendingorders = this.orderService.pendingorders;
      loader.dismiss();
    })
  }

  showDetails(order) {
    this.navCtrl.push("OrderDetailsPage", { order: order, id: 1 });
    // let currentIndex = this.navCtrl.getActive().index;
    // this.navCtrl.setRoot('OrderDetailsPage', { order: order }).then(() => {
    //   this.navCtrl.remove(currentIndex);
    // });
  }

}
