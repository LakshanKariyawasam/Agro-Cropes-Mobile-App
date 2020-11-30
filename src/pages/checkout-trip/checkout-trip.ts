import {Component} from "@angular/core";
import {NavController, LoadingController, ToastController, NavParams} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-checkout-trip',
  templateUrl: 'checkout-trip.html'
})
export class CheckoutTripPage {
  // trip data
  public trip: any;
  public id: any;
  public location: any;
  public date: string;
  public poplocation: string;
  // number of members
  public adults: any;
  public child: any;


  public paymethods = 'creditcard';

  constructor(public nav: NavController, public tripService: TripService, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navParams: NavParams) {
    this.id = this.navParams.get('id');
    this.location = this.navParams.get('location');
    this.adults = this.navParams.get('newAdults');
    this.child = this.navParams.get('newChildren');
    this.date = this.navParams.get('date');
    this.poplocation = this.navParams.get('poplocation');
    // set sample data
    this.trip = tripService.getItem(this.id,this.location,this.poplocation);
  }

  // process send button
    send() {
    // send booking info
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    // show message
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      cssClass: 'profile-bg',
      message: 'Book Activity Success!',
      duration: 1000,
      position: 'bottom'
    });

    loader.present();

    setTimeout(() => {
      loader.dismiss();
      toast.present();
      // back to home page
      this.nav.setRoot(HomePage);
    }, 3000)
  }
}
