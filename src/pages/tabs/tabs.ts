import { Component } from '@angular/core';

import { NavParams, IonicPage, Events, ModalController, NavController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  mySelectedIndex: number;
  bisTypeId: any;

  count1: any;

  userId: any;
  orders: any[];
  customers: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, private orderService: OrderProvider, private userService: UserProvider, public events: Events) {
    this.userId = JSON.parse(window.localStorage.getItem('user')).userId;

    this.events.publish('user:login');
    this.events.subscribe('countOrders', () => {

    });

    this.bisTypeId = JSON.parse(window.localStorage.getItem('user')).bisTypeId;

    if (this.bisTypeId == 2) {
      this.mySelectedIndex = navParams.data.tabIndex || 0;

      this.tab1Root = 'DashboardPage';
      this.tab2Root = 'OrdersPage';
      this.tab3Root = 'CartPage';

    } else {
      this.mySelectedIndex = navParams.data.tabIndex || 0;

      this.tab1Root = 'HomePage';
      this.tab2Root = 'CartPage';
    }
  }


  ionViewWillEnter() {
    this.getorders();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('customersLoaded');
    this.events.unsubscribe('orderLoaded');
  }

  getorders() {
    this.orderService.change();
    this.userService.getUserListByPerentUser(this.userId);
    this.events.subscribe('customersLoaded', () => {
      this.customers = this.userService.customers;
      this.customers.forEach(element => {
        this.orderService.getOrderListByUser(element);
        this.events.subscribe('orderLoaded', () => {
          this.orders = this.orderService.orders;
          console.log("count1:: ", this.orders.length)
          this.count1 = this.orders.length;
        })
      });
    });
  }
}
