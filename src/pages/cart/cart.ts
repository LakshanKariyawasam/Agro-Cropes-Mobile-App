import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { CartProvider } from "../../providers/cart/cart";
import firebase from "firebase";

@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {
  cartItems: any[] = [];
  totalCount: number = 0;
  isCartItemLoaded: boolean = false;
  isEmptyCart: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartProvider,
    private loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter(){
    this.totalCount = 0;
    this.isEmptyCart = true;
    this.isCartItemLoaded = false;
    this.loadCartItems();
  }

  // ionViewDidLoad() {
  //   this.loadCartItems();
  // }

  loadCartItems() {
    this.totalCount = 0;
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
    this.cartService
      .getCartItems()
      .then(val => {
        this.cartItems = val;

        if (this.cartItems.length > 0) {
          this.cartItems.forEach((v, indx) => {
            this.totalCount += parseInt(v.count);
          });
          this.isEmptyCart = false;
          console.log("isEmptyCart :::",this.isEmptyCart);
          console.log("totalCount :::",this.totalCount);
        }

        this.isCartItemLoaded = true;
        loader.dismiss();
      })
      .catch(err => {});
  }

  checkOut() {
    var user = firebase.auth().currentUser;
    if (user) {
      this.navCtrl.push("CheckoutPage");
    } else {
      this.navCtrl.setRoot("LoginPage");
    }
  }

  removeItem(itm) {
    this.cartService.removeFromCart(itm).then(() => {
      this.loadCartItems();
    });
  }
}
