import {Component} from "@angular/core";
import {NavController, IonicPage} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public nav: NavController) {
  }

  // logout
  logout() {
    this.nav.setRoot('LoginPage');
  }
}
