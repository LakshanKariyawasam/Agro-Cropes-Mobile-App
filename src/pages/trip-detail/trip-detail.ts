import {Component, ViewChild, ElementRef} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {CheckoutTripPage} from "../checkout-trip/checkout-trip";
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from "../../../node_modules/@ionic-native/social-sharing";
declare var google: any;

@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  // trip info
  public trip: any;
  public id: any;
  public location: any;
  public date: string;
  public poplocation: string;
  // number of adult
  public adults = 2;
  public newAdults: any;
  // number of children
  public children = 0;
  public newChildren: any;
  //share
  message:string = null;
  file:string = null;
  link:string = null;
  subject:string = null;


  @ViewChild('map') mapRef: ElementRef;

  constructor(public nav: NavController,private socialSharing: SocialSharing, public tripService: TripService, public navParams: NavParams,public callNumber: CallNumber) {
    this.trip = this.navParams.get('trip');
    this.location = this.navParams.get('location');
    this.date = this.navParams.get('date');
    this.poplocation = this.navParams.get('poplocation');
    console.log(this.trip);
    console.log(this.location);

    // set sample data
    // this.trip = tripService.getItem(this.id);
  }

  // minus adult when click minus button
  minusAdult() {
    this.newAdults = this.adults--;
  }

  // plus adult when click plus button
  plusAdult() {
    this.newAdults = this.adults++;
    console.log(this.newAdults);
  }

  // minus children when click minus button
  minusChildren() {
    this.newChildren = this.children--;
  }

  // plus children when click plus button
  plusChildren() {
    this.newChildren = this.children++;
  }

  
  // go to checkout page
  checkout() {
    console.log(this.location);
    this.nav.push(CheckoutTripPage,{id: this.trip.id,location: this.location,newAdults: this.newAdults,newChildren: this.newChildren,date: this.date,poplocation: this.poplocation});
  }

  call() {
    this.callNumber.callNumber("0716505314", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }


  ionViewDidLoad() {
    this.showmap();
  }

  showmap(){
    const location = new google.maps.LatLng(this.trip.lat,this.trip.long);

    const options = {
      center: location,
      zoom: 15,
      streetViewControl: false,
      mapType: 'roadmap'
    }
  
    const map = new google.maps.Map(this.mapRef.nativeElement,options);
  
    this.addMarker(location,map);
  }

  addMarker(position,map){
    return new google.maps.Marker({
      position,
      map,
      label: this.trip.name
    });
  }

  share(){
    this.socialSharing.share(this.message,this.subject , null ,this.trip.link)
    .then(()=>{

    }).catch(()=>{}

    );
  }

}
