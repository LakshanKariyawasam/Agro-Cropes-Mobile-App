import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Events } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage {

  userId: any;
  acceptOrders: any[] = [];
  acceptOrdersCnt: any;
  rejectOrders: any[] = [];
  rejectOrdersCnt: any;
  customers: any[] = [];


  public statusChange: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController, private orderService: OrderProvider, private userService: UserProvider, public events: Events) {
    this.userId = JSON.parse(window.localStorage.getItem('user')).userId;
    this.statusChange = 'accepted';
  }


  ionViewWillEnter() {
    this.getorders();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('customersLoaded');
    this.events.unsubscribe('acceptOrderLoaded');
    this.events.unsubscribe('rejectOrderLoaded');
  }

  getorders() {
    let loader = this.loadingCtrl.create({
      content: 'Loading orders..'
    });
    loader.present();


    this.userService.getUserListByPerentUser(this.userId);
    this.events.subscribe('customersLoaded', () => {
      this.customers = this.userService.customers;
      this.customers.forEach(element => {

        this.orderService.change();
        this.orderService.getAcceptOrderListByUser(element);
        this.events.subscribe('acceptOrderLoaded', () => {
          this.acceptOrders = this.orderService.acceptorders;
          this.acceptOrdersCnt = this.acceptOrders.length;
          loader.dismiss();
        })

        this.orderService.change();
        this.orderService.getRejectOrderListByUser(element);
        this.events.subscribe('rejectOrderLoaded', () => {
          this.rejectOrders = this.orderService.rejectorders;
          this.rejectOrdersCnt = this.rejectOrders.length;
          loader.dismiss();
        })
      });
    });
  }

  showDetails(order) {
    this.navCtrl.push("OrderDetailsPage", { order: order, id: 2 });
    // let currentIndex = this.navCtrl.getActive().index;
    // this.navCtrl.setRoot('OrderDetailsPage', { order: order }).then(() => {
    //   this.navCtrl.remove(currentIndex);
    // });
  }
}
