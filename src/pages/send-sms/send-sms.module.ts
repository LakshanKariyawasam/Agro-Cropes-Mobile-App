import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendSmsPage } from './send-sms';

@NgModule({
  declarations: [
    SendSmsPage,
  ],
  imports: [
    IonicPageModule.forChild(SendSmsPage),
  ],
})
export class SendSmsPageModule {}
