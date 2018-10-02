import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Place } from '../../interfaces/place';

/**
 * Generated class for the NewRunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-run',
  templateUrl: 'new-run.html',
})
export class NewRunPage {
  toRun: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.toRun = [{place:new Place("Oxford square"),visited:true},
    {place:new Place("Faulkner's house"), visited:false}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRunPage');
  }

}
