import { Component } from '@angular/core';

import { NavParams, IonicPage, Events, ModalController, NavController } from 'ionic-angular';

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
  bisTypeId: any = 3;

  count1: any;

  userId: any;
  orders: any[];
  customers: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public events: Events) {
    this.userId = JSON.parse(window.localStorage.getItem('user')).userId;

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
  }

  ionViewDidLeave() {
  }

}
