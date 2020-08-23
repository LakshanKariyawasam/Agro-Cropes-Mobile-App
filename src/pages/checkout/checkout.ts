import { Component } from "@angular/core";
import firebase from "firebase";
import { IonicPage, LoadingController, NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { CartProvider } from "../../providers/cart/cart";
import { OrderProvider } from "../../providers/order/order";


@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage {
  cartItems: any[] = [];
  userData = { "address": "", "email": "", "mobile": "", "name": "", "perentBisId": "" }
  totalCnt: number = 0;
  customerName: any;
  selectdate: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartProvider,
    private loadingCtrl: LoadingController,
    public authService: AuthProvider,
    private orderService: OrderProvider
  ) {
    this.loadCartItems();
  }

  loadCartItems() {
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
            this.totalCnt += parseInt(v.count);
          });
        }
        loader.dismiss();
      })
      .catch(err => { });
  }

  ionViewDidLoad() {
    this.authService
      .getuserdetails()
      .then((response: any) => {
        this.customerName = response.name;
        this.userData = response;
        this.selectdate = response.date;
        console.log("userData", this.userData);
      })
      .catch(err => {
        console.log("err", err);
      });


  }

  ionViewWillEnter() {
    var user = firebase.auth().currentUser;
    if (!user) this.navCtrl.setRoot("LoginPage");
  }

  ionViewCanEnter() { }

  placeOrder() {
    let loader = this.loadingCtrl.create({
      content: "Placing Order.."
    });
    loader.present();
    var user = firebase.auth().currentUser;
    if (user) {
      let orderObj = {
        userId: user.uid,
        name: this.customerName,
        count: this.totalCnt,
        orders: this.cartItems,
        date: this.selectdate
      };

      this.orderService.placeOrder(orderObj).then(() => {
        loader.dismiss();
        this.navCtrl.setRoot('HomePage');
      });
    } else {
      loader.dismiss();
    }
  }
}
