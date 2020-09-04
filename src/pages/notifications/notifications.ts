import {Component} from "@angular/core";
import {ViewController, IonicPage} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})

export class NotificationsPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
