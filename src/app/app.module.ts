import { config } from './../config/app.config';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { CallNumber } from '@ionic-native/call-number';
import { GoogleMaps } from "@ionic-native/google-maps";
import { IonMarqueeModule } from "../ion-marquee";
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';


import { ActivityService } from "../services/activity-service";
import { TripService } from "../services/trip-service";
import { WeatherProvider } from "../services/weather";
import { SocialSharing } from '@ionic-native/social-sharing';
import { StarRatingModule } from 'ionic3-star-rating';

import { MyApp } from "./app.component";

import firebase from 'firebase'

import { ProductsProvider } from '../providers/products/products';
import { UserData } from '../providers/user-data';
import { AuthProvider } from '../providers/auth/auth';
import { CartProvider } from '../providers/cart/cart';
import { CategoryProvider } from '../providers/category/category';
import { OrderProvider } from '../providers/order/order';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

firebase.initializeApp(config.firebaseConfig);

// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonMarqueeModule,
    HttpClientModule,
    StarRatingModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      HttpModule
    }),
    IonicStorageModule.forRoot({
      name: '__Get_Rest',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    TripService,
    NativePageTransitions,
    WeatherProvider,
    FingerprintAIO,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CallNumber,
    SocialSharing,
    GoogleMaps,
    UserData,
    ProductsProvider,
    AuthProvider,
    CartProvider,
    CategoryProvider,
    OrderProvider
  ]
})

export class AppModule {
}
