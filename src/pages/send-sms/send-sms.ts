import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Nexmo from 'nexmo';

/**
 * Generated class for the SendSmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-sms',
  templateUrl: 'send-sms.html',
})
export class SendSmsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendSmsPage');
  }

  sendSms() {

    var promise = new Promise((resolve, reject) => {
      // const Nexmo = require('nexmo');

      const nexmo = new Nexmo({
        apiKey: '80b3c93f',
        apiSecret: 'Tf9m9LLQMNB7IQPB',
      });

      const from = 'Agro Cropes';
      const to = '94702378925';
      const text = 'Hello from Vonage SMS API. And this is test msg for nexmo.';

      nexmo.message.sendSms(from, to, text);
      resolve(true);
    })

    return promise;
  }

}
