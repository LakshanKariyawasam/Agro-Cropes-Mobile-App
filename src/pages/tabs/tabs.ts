import { Component } from '@angular/core';

import { NavParams, IonicPage, Events } from 'ionic-angular';

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

  constructor(public events: Events, navParams: NavParams) {
    this.events.publish('user:login');
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
}
