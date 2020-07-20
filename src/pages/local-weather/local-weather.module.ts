import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalWeatherPage } from './local-weather';

@NgModule({
  declarations: [
    LocalWeatherPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalWeatherPage),
  ],
})
export class LocalWeatherPageModule { }
