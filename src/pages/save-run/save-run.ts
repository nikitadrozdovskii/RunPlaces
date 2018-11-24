import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaveRunPage');
  }

  discard(){
    this.viewCtrl.dismiss();
  }

  save(){
    window.alert('good job!');
  }
}
