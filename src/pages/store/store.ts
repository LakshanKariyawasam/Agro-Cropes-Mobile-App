import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, IonicPage, ToastController, Content } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { CartProvider } from '../../providers/cart/cart';

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
  productRows: any;
  selectProduct: any;
  productCount: number = 1;
  cartItems: any[];

  @ViewChild('pageTop') pageTop: Content;

  constructor(public navCtrl: NavController,
    private productService: ProductsProvider,
    private events: Events, private nativePageTransitions: NativePageTransitions,
    public navParams: NavParams, public toastCtrl: ToastController, private cartService: CartProvider) {
  }

  ionViewWillEnter() {
    this.loadProducts();
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
    this.productService.getProducts();
    this.events.subscribe('productsLoaded', () => {
      this.products = this.productService.products;
      this.productRows = Array.from(Array(Math.ceil(this.products.length / 2)).keys());

    })
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

    this.selectProduct = product;
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


}
