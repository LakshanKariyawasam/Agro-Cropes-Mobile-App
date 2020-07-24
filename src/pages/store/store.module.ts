import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorePage } from './store';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    StorePage,
  ],
  imports: [
    IonicPageModule.forChild(StorePage),
    StarRatingModule,
  ],
})
export class StorePageModule { }
