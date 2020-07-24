import { Component } from '@angular/core';

import { MenuController, NavController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';


export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  // showImage = true;

  constructor(public navCtrl: NavController, public menu: MenuController, public storage: Storage) {
    this.slides = [
      {
        title: '<b>Choose your Desired Item</b>',
        description: 'No More Issues With Your Order Again. Our App Taking Care Of Everything ',
        image: 'assets/imgs/s1.png',
      },
      {
        title: '<b>Connect your Trade Center</b>',
        description: 'We Will Connect You To The Vendors And There Stores. There You can Buy What You Need Easley. ',
        image: 'assets/imgs/s2.png',
      },
      {
        title: '<b>Pick up or Delivery</b>',
        description: 'Based On Your Location Your Foods will Be delivery.Lets Sign up  ',
        image: 'assets/imgs/s3.png',
      }
    ];

    // setTimeout(() => {
    //   this.showImage = false;
    //   this.showSkip = true;
    // }, 3000);
  }

  startApp() {
    this.navCtrl.push('LoginPage');
    this.storage.set('hasSeenTutorial', 'true');
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
