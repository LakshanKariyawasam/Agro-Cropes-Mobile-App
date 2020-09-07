import { Component } from '@angular/core';
import { Events, IonicPage, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {

  user: any;
  orders: any[] = [];
  acceptOrders: any[] = [];
  acceptOrdersCnt: any;
  rejectOrders: any[] = [];
  rejectOrdersCnt: any;
  customers: any[] = [];


  public statusChange: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController, private orderService: OrderProvider, public events: Events) {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.statusChange = 'accepted';
  }


  ionViewWillEnter() {
    if (this.user.bisTypeId == 2) {
      this.getordersWTC();
    } else {
      this.getordersVendor();
    }
  }

  ionViewDidLeave() {
    if (this.user.bisTypeId == 2) {
      this.events.unsubscribe('acceptOrderLoaded');
      this.events.unsubscribe('rejectOrderLoaded');
    } else {

    }
  }

  getordersWTC() {
    let loader = this.loadingCtrl.create({
      content: 'Loading orders..'
    });
    loader.present();

    this.orderService.getAcceptOrderListByUser(this.user.userId);
    this.events.subscribe('acceptOrderLoaded', () => {
      this.acceptOrders = this.orderService.acceptorders;
      this.acceptOrdersCnt = this.acceptOrders.length;
      loader.dismiss();
    })

    this.orderService.change();
    this.orderService.getRejectOrderListByUser(this.user.userId);
    this.events.subscribe('rejectOrderLoaded', () => {
      this.rejectOrders = this.orderService.rejectorders;
      this.rejectOrdersCnt = this.rejectOrders.length;
      loader.dismiss();
    })
  }

  getordersVendor() {
    let loader = this.loadingCtrl.create({
      content: 'Loading orders..'
    });
    loader.present();

    this.orderService.getOrderListByUser(this.user);
    this.events.subscribe('ordersLoaded', () => {
      this.orders = this.orderService.orders;
      loader.dismiss();
    })
  }


  showDetails(order) {
    this.navCtrl.push("OrderDetailsPage", { order: order, id: 2 });
    // let currentIndex = this.navCtrl.getActive().index;
    // this.navCtrl.setRoot('OrderDetailsPage', { order: order }).then(() => {
    //   this.navCtrl.remove(currentIndex);
    // });
  }
}
