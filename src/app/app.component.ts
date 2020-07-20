import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, Events } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { UserData } from "../providers/user-data";
import { CategoryProvider } from "../providers/category/category";

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  appMenuItems: Array<MenuItem>;
  categories:any[];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public userData: UserData,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,private categoryService:CategoryProvider,
    private events:Events
  ) {
    
    // Check if the user has already seen the tutorial
    this.userData.checkHasSeenTutorial().then((hasSeenTutorial) => {
      if (hasSeenTutorial === null) {
        // User has not seen tutorial
        this.rootPage = 'TutorialPage';
      } else {
        // User has seen tutorial
        this.rootPage = 'LoginPage';
      }
    });
    
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: 'TabsPage', icon: 'home'},
      // {title: 'Bookings', component: HomePage, icon: 'bookmark'},
      // {title: 'Deals', component: HomePage, icon: 'bookmark'},
      // {title: 'Next Trips', component: HomePage, icon: 'map'},
      // {title: 'Your Contributions', component: HomePage, icon: 'bookmark'},
      // {title: 'Travel Articales', component: HomePage, icon: 'paper'},
      {title: 'Store', component: 'StorePage', icon: 'ios-archive'},
      {title: 'Settings', component: 'SettingsPage', icon: 'ios-settings'},
      {title: 'Show Tutorial', component: 'TutorialPage', icon: 'ios-hammer'},
      {title: 'About Us', component: 'HomePage', icon: 'ios-information-circle'},
    ];

    this.getCategories();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
    });
  }
  
  getCategories(){
    this.categoryService.getCategories();

    this.events.subscribe('categoryLoaded', () => {
      this.categories = this.categoryService.categories;
      
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot('LoginPage');
  }

}
