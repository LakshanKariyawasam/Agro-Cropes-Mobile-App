import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public date: string;
  // search condition
  public search = {
    name: "Choose your location...",
    date: new Date().toISOString()
  }
 

  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
  }


  
  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Choose your location...";
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  
  // go to result page
  doSearch() {
    this.storage.get('pickup').then((val) => {
      this.date = this.search.date;
      this.nav.push(TripsPage, { location: val,date: this.date  });
    }).catch((err) => {
      console.log(err)
    });
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  populerplace(val){
      this.nav.push(TripsPage, { poplocation: val });
      console.log(val);
  }
  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

//
