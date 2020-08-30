import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { CartProvider } from '../../providers/cart/cart';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private orderService: OrderProvider, public events: Events,
    private loadingCtrl: LoadingController, private cartService: CartProvider, public toastCtrl: ToastController) {
    this.order = this.navParams.get("order");
    console.log("order ::: ", this.order);
  }

  ionViewWillEnter() {
    this.getOrderDetails();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('orderDetailsLoaded');
  }

  getOrderDetails() {
    let loader = this.loadingCtrl.create({
      content: 'Loading orders..'
    });
    loader.present();

    this.orderService.getOrderDetailsByOrder(this.order);
    this.events.subscribe('orderDetailsLoaded', () => {
      this.ordersDetails = this.orderService.ordersDetails;

      loader.dismiss();
    })
  }

  acceptOrder() {
    let loader = this.loadingCtrl.create({
      content: 'Accepting order..'
    });
    loader.present();

    this.orderService.acceptOrder(this.order).then(() => {
      this.presentAlert("Order Creation Sucsessfully, An activation link has been sent to vendor registered email");
      this.ordersDetails.forEach((v, indx) => {
        this.addToCart(v);
      });
      loader.dismiss();
    });
  }


  addToCart(product) {
    console.log("product:: ", product);
    var productPrice = product.qty * parseInt(product.price);
    let cartProduct = {
      product_id: product.id,
      name: product.productName,
      thumb: product.thumb,
      count: product.qty,
      totalPrice: productPrice
    };
    this.cartService.addToCart(cartProduct).then((val) => {
      this.presentToast(cartProduct.name);
    });
  }

  presentToast(name) {
    let toast = this.toastCtrl.create({
      message: `${name} has been added to cart`,
      showCloseButton: true,
      // closeButtonText: 'View Cart'
    });

    // toast.onDidDismiss(() => {
    //   this.navCtrl.setRoot('TabsPage', { tabIndex: 1 });
    //   // this.navCtrl.push('CartPage');
    // });
    toast.present();
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Auth Success',
      subTitle: message,
      buttons: ['Close']
    });

    alert.onDidDismiss(res => {
      this.navCtrl.pop();
    });
    alert.present();
  }


}
