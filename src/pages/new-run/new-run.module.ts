import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRunPage } from './new-run';

@NgModule({
  declarations: [
    NewRunPage,
  ],
  imports: [
    IonicPageModule.forChild(NewRunPage),
  ],
})
export class NewRunPageModule {}
