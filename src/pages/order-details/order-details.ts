import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {


  ordersDetails: any[];
  order: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderProvider, public events: Events,
    private loadingCtrl: LoadingController) {
    this.order = this.navParams.get("order");
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Loading orders..'
    });
    loader.present();

    console.log('ionViewDidLoad OrderDetailsPage');
    this.orderService.getOrderDetailsByOrder(this.order);
    this.events.subscribe('orderDetailsLoaded', () => {
      this.ordersDetails = this.orderService.ordersDetails;

      loader.dismiss();
    })

  }



}
