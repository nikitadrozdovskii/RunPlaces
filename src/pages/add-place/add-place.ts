import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RunService } from '../../services/run.service';
import { Place } from '../../interfaces/place';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the AddPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private runService: RunService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  addPlace(form: NgForm){
    this.runService.addPlaceToCurrentRun(new Place(form.value.name));
    this.navCtrl.pop();
  }

}
