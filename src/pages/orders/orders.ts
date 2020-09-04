import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
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
  customers: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController, private orderService: OrderProvider, private userService: UserProvider, public events: Events) {
    this.userId = JSON.parse(window.localStorage.getItem('user')).userId;
  }

  ionViewWillEnter() {
    this.getorders();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('customersLoaded');
    this.events.unsubscribe('pendingOrderLoaded');
  }

  ionViewWillLeave() {

  }

  getorders() {
    let loader = this.loadingCtrl.create({
      content: 'Loading orders..'
    });
    loader.present();

    this.orderService.change();

    this.userService.getUserListByPerentUser(this.userId);
    this.events.subscribe('customersLoaded', () => {
      this.customers = this.userService.customers;
      this.customers.forEach(element => {
        this.orderService.getPendingOrderListByUser(element);
        this.events.subscribe('pendingOrderLoaded', () => {
          this.pendingorders = this.orderService.pendingorders;
          loader.dismiss();
        })
      });
    });
  }

  showDetails(order) {
    this.navCtrl.push("OrderDetailsPage", { order: order , id: 1});
    // let currentIndex = this.navCtrl.getActive().index;
    // this.navCtrl.setRoot('OrderDetailsPage', { order: order }).then(() => {
    //   this.navCtrl.remove(currentIndex);
    // });
  }

}
