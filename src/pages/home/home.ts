import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, AlertController, ToastController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { OrderProvider } from '../../providers/order/order';
import { isNumeric } from 'rxjs/util/isNumeric';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  bisTypeId: any;
  promoSliders: any[];
  promoImagesLoaded: boolean = false;
  surplusDetails: any[];
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductsProvider, private orderService: OrderProvider,
    private loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController,
    private events: Events, private nativePageTransitions: NativePageTransitions) {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.bisTypeId = JSON.parse(window.localStorage.getItem('user')).bisTypeId;
    console.log("bisTypeId ::: ", this.bisTypeId)
  }

  ionViewWillEnter() {
    if (this.bisTypeId != 2) {
      this.loadSurpluse();
    }
    this.loadPromo();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('promoLoaded');
  }

  ionViewWillLeave() {

    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    };

    this.nativePageTransitions.slide(options)
      .then(() => {

      })
      .catch((err) => {

      });

  }



  ionViewDidLoad() {

  }

  loadPromo() {
    let loader = this.loadingCtrl.create({
      content: 'Loading Promos..'
    });
    loader.present();
    this.productService.getPromoSlider();

    this.events.subscribe('promoLoaded', () => {
      this.promoSliders = this.productService.promos;
      console.log("promoSliders :: ", this.promoSliders)
      if (this.promoSliders.length > 0) {
        this.promoImagesLoaded = true;
      }
      loader.dismiss();
    })
  }

  viewDetail(val: any) {
    console.log("val::::", val)
    this.navCtrl.push("StorePage", { val: val });
  }

  loadSurpluse() {
    this.orderService.getSurplusDetails(this.user.perentBisId);
    this.events.subscribe('surplusDetailsLoaded', () => {
      this.surplusDetails = this.orderService.surplusDetails;
      if (this.surplusDetails.length > 0) {
        console.log("surplusDetails::: ", this.surplusDetails)
        this.presentAlert("You have new surpluse from WTC with " + this.surplusDetails[0].productName + " , " + this.surplusDetails[0].qty + "Kg. Please accept the order.");
      }
    })
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Surpluse Order',
      subTitle: message,
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Create',
          handler: (inputs: { quantity: number }) => {
            if (!isNumeric(inputs.quantity)) {
              let toast = this.toastCtrl.create({
                message: 'Your input is invalid. Please input numbers.',
                showCloseButton: true,
                duration: 1000
              });
              toast.present();
              return false;
            } else if (inputs.quantity > this.surplusDetails[0].qty) {
              let toast = this.toastCtrl.create({
                message: 'Your input is greater than the ordered count.',
                showCloseButton: true,
                duration: 1000
              });
              toast.present();
              return false;
            } else {
              let loader = this.loadingCtrl.create({
                content: 'Accepting order..'
              });
              loader.present();

              this.orderService.acceptSurpluseOrder(inputs.quantity, this.surplusDetails[0], this.user.userId).then(() => {
                loader.dismiss();

                let toast = this.toastCtrl.create({
                  message: 'Order Accept Sucsessfully.',
                  showCloseButton: true,
                  duration: 1000
                });
                toast.present();
              });
            }
          }
        }
      ],
      enableBackdropDismiss: false
    });

    alert.present();
  }
}
