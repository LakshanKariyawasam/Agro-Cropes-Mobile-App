import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, IonicPage, ToastController, Content, LoadingController, AlertController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { CartProvider } from '../../providers/cart/cart';
import firebase from 'firebase';

/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  products: any[];
  fruits: any[];
  productRows: any;
  fruitsRows: any;
  selectProduct: any;
  productCount: number = 1;
  cartItems: any[];

  type: any;


  ratingValue: number = 3;

  surplusVal: number = 0;

  @ViewChild('pageTop') pageTop: Content;

  constructor(public navCtrl: NavController,
    private productService: ProductsProvider,
    private loadingCtrl: LoadingController,
    private events: Events, private nativePageTransitions: NativePageTransitions, public alertCtrl: AlertController,
    public navParams: NavParams, public toastCtrl: ToastController, private cartService: CartProvider) {
    if (this.navParams.get("val") == 'Vegetables') {
      this.loadProducts();
    } else if (this.navParams.get("val") == 'Surplus Vegitable') {
      this.surplusVal = 1;
      this.loadProducts();
    } else {
      this.loadFruits();
    }

    this.type = this.navParams.get("val");
  }

  ionViewWillEnter() {
    // this.loadProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorePage');
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

  loadProducts() {
    let loader = this.loadingCtrl.create({
      content: 'Loading Vegitables..'
    });
    loader.present();
    this.productService.getProducts();
    this.events.subscribe('productsLoaded', () => {
      this.products = this.productService.products;
      this.productRows = Array.from(Array(Math.ceil(this.products.length / 2)).keys());
      this.selectProduct = this.products[0];
      loader.dismiss();
    })
  }

  loadFruits() {
    let loader = this.loadingCtrl.create({
      content: 'Loading Fruits..'
    });
    loader.present();
    this.productService.getProductss();
    this.events.subscribe('productsLoaded', () => {
      this.fruits = this.productService.fruits;
      this.fruitsRows = Array.from(Array(Math.ceil(this.fruits.length / 2)).keys());
      this.selectProduct = this.fruits[0];
      loader.dismiss();
    })

    console.log("fruits :: ", this.fruits)
  }

  logRatingChange(rating) {
    console.log("changed rating: ", rating);
    this.ratingValue = rating;
    // do your stuff
  }

  showDetails(product) {
    // let options: NativeTransitionOptions = {
    //   direction: 'up',
    //   duration: 500,
    //   slowdownfactor: 3,
    //   slidePixels: 20,
    //   iosdelay: 100,
    //   androiddelay: 150,
    //   fixedPixelsTop: 0,
    //   fixedPixelsBottom: 60
    // };
    // this.nativePageTransitions.slide(options);
    // this.navCtrl.push("SinglePage", { product: product });

    if (this.type == 'Vegetables') {
      this.selectProduct = product;
    } else if (this.type == 'Surplus Vegitable') {
      this.selectProduct = product;
    } else {
      this.selectProduct = product;
    }

    this.pageTop.scrollToTop();
    this.productCount = 1;
  }

  decreaseProductCount() {
    if (this.productCount > 1) {
      this.productCount--;
    }
  }

  incrementProductCount() {
    this.productCount++;
  }

  addToCart(product) {
    var productPrice = this.productCount * parseInt(product.price);
    let cartProduct = {
      product_id: product.id,
      name: product.name,
      thumb: product.thumb,
      count: this.productCount,
      totalPrice: productPrice
    };
    this.cartService.addToCart(cartProduct).then((val) => {
      this.presentToast(cartProduct.name);
    });
  }

  addSurplus(product) {
    console.log("cartProduct:: ", product);
    let loader = this.loadingCtrl.create({
      content: "Placing Surplus.."
    });
    loader.present();
    var user = firebase.auth().currentUser;
    if (user) {
      let cartProduct = {
        userId: user.uid,
        product_id: product.id,
        name: product.name,
        thumb: product.thumb,
        count: this.productCount
      };

      this.cartService.addSurplus(cartProduct).then(() => {
        loader.dismiss();
        this.presentAlert("Surplus Added Sucsessfully, An order has been sent to vendors registered mobile/email");
      });
    } else {
      loader.dismiss();
    }
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Order Success',
      subTitle: message,
      buttons: ['Close']
    });

    alert.onDidDismiss(res => {
      this.navCtrl.pop();
      this.navCtrl.push('SurplusPage');
    });
    alert.present();
  }

  presentToast(name) {
    let toast = this.toastCtrl.create({
      message: `${name} has been added to cart`,
      showCloseButton: true,
      duration: 1000
    });
    toast.present();
  }


}
