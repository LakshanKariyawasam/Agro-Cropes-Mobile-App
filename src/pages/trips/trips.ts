import {Component} from "@angular/core";
import {NavController, NavParams, ToastController} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {TripDetailPage} from "../trip-detail/trip-detail";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  // list of trips
  public trips: any;
  public location: string;
  public date: string;
  public poplocation: string;

  constructor(public nav: NavController, public tripService: TripService, public navParams: NavParams,public toastCtrl: ToastController) {
    this.location = this.navParams.get('location');
    this.date = this.navParams.get('date');
    this.poplocation = this.navParams.get('poplocation');

    console.log(this.location);
    console.log(this.poplocation);

    // set sample data
    if(this.location == '') {

    }
    if(this.location == 'Ampara' ) {
      this.trips = tripService.getAllAmpara();
    }
    if(this.location == 'Anuradhapura' ) {
      this.trips = tripService.getAllAnuradhapura();
    }    
    if(this.location == 'Badulla' || this.poplocation == 'Badulla') {
      this.trips = tripService.getAllBadulla();
    }    
    if(this.location == 'Batticalo'  ) {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }   
    if(this.location == 'Colombo' || this.poplocation == 'Colombo') {
      this.trips = tripService.getAllColombo();
    }
    if(this.location == 'Galle' || this.poplocation == 'Galle') {
      this.trips = tripService.getAllGalle();
    }    
    if(this.location == 'Gampaha') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Hambanthota') {
      this.trips = tripService.getAllHambanthota();
    }    
    if(this.location == 'Jaffna') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Kaluthara') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Kandy' || this.poplocation == 'Kandy') {
      this.trips = tripService.getAllKandy();
    }    
    if(this.location == 'Kagalle') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Kilinochchi') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Kurunegala') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Mannar') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Mathale') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Mathara') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Monaragala') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Mullathivu') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Nuwara Eliya') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Polonnaruwa') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Puttalam') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }    
    if(this.location == 'Rathnapura') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }   
    if(this.location == 'Trincomalee') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }
    if(this.location == 'Vavuniya') {
      const toast = this.toastCtrl.create({
        message: 'Under the development.',
        duration: 3000
      });
      toast.present();
      this.nav.setRoot(LoginPage);
    }
  }

  // view trip detail
  viewDetail(trip) {
    this.nav.push(TripDetailPage, {trip: trip,location: this.location,date: this.date,poplocation: this.poplocation});
  }
}
