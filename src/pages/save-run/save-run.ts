import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RunService } from '../../services/run.service';

/**
 * Generated class for the SaveRunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-save-run',
  templateUrl: 'save-run.html',
})
export class SaveRunPage {
  pace = 0;
  distance = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private runService:RunService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaveRunPage');
    this.pace = Math.floor(this.navParams.get('pace') * 100)/100;
    this.distance = Math.floor(this.navParams.get('distance') * 100)/100;
  }

  discard(){
    this.viewCtrl.dismiss();
  }

  save(){
    this.runService.saveCurrentRunToDB(this.pace,this.distance);
    this.viewCtrl.dismiss();
  }
}
