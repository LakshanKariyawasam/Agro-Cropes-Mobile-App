import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  promoSliders: any[];
  promoImagesLoaded: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductsProvider,
    private loadingCtrl: LoadingController,
    private events: Events, private nativePageTransitions: NativePageTransitions) {
  }

  ionViewWillEnter() {
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
      console.log("promoSliders :: ", this.promoSliders )
      if (this.promoSliders.length > 0) {
        this.promoImagesLoaded = true;
      }
      loader.dismiss();
    })
  }

  viewDetail(val: any) {
    console.log("val::::",val)
    this.navCtrl.push("StorePage",{val:val});
  }
}
