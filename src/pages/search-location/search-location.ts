import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Storage} from '@ionic/storage';

// import {SearchCarsPage} from "../search-cars/search-cars";

@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html'
})

export class SearchLocationPage {
  public fromto: any;
  public trip: any;

  // places
  public places = {
    nearby: [
      {
        id: 1,
        name: "Ampara"
      },
      {
        id: 2,
        name: "Anuradhapura"
      },
      {
        id: 3,
        name: "Badulla"
      },
      {
        id: 4,
        name: "Batticalo"
      },
      {
        id: 5,
        name: "Colombo"
      },
      {
        id: 6,
        name: "Galle"
      },
      {
        id: 7,
        name: "Gampaha"
      },{
        id: 8,
        name: "Hambanthota"
      },{
        id: 9,
        name: "Jaffna"
      },{
        id: 10,
        name: "Kaluthara"
      },{
        id: 11,
        name: "Kandy"
      },{
        id: 12,
        name: "Kegalle"
      },{
        id: 13,
        name: "Kilinochchi"
      },{
        id: 14,
        name: "Kurunegala"
      },{
        id: 15,
        name: "Mannar"
      },{
        id: 16,
        name: "Mathale"
      },{
        id: 17,
        name: "Mathara"
      },{
        id: 18,
        name: "Monaragala"
      },{
        id: 19,
        name: "Mullathivu"
      },{
        id: 20,
        name: "Nuwara Eliya"
      },{
        id: 21,
        name: "Polonnaruwa"
      },{
        id: 22,
        name: "Puttalam"
      },{
        id: 23,
        name: "Ratnapura"
      },{
        id: 24,
        name: "Trincomalee"
      },{
        id: 25,
        name: "Vavuniya"
      }
    ]
  };

  constructor(private storage: Storage, public nav: NavController, public navParams: NavParams) {
    this.fromto = this.navParams.data;
  }

  // search by item
  searchBy(item) {
    if (this.fromto === 'from') {
      this.storage.set('pickup', item.name);
    }

    if (this.fromto === 'to') {
      this.storage.set('dropOff', item.name);
    }
    // this.nav.push(SearchCarsPage);
    this.nav.pop();
  }
}
