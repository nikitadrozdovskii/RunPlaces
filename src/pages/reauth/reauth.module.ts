import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReauthPage } from './reauth';

@NgModule({
  declarations: [
    ReauthPage,
  ],
  imports: [
    IonicPageModule.forChild(ReauthPage),
  ],
})
export class ReauthPageModule {}
