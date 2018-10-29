import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Place } from '../../interfaces/place';
import { AddPlacePage } from '../add-place/add-place';
import { RunService } from '../../services/run.service';

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
  runMode = false;
  toRun: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private runService:RunService) {
    this.toRun = [{place:new Place("Oxford square"),visited:true},
    {place:new Place("Faulkner's house"), visited:false}];
  }

  ionViewWillEnter(){
    let currentPlaces = this.runService.getCurrentPlaces();
    let unvisitedPlaces = [];
    currentPlaces.forEach(place=>{
      unvisitedPlaces.push({place:place, visited:false});
    });
    this.toRun = unvisitedPlaces;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRunPage');
  }

  addPlacePage(){
    console.log('123');
    this.navCtrl.push(AddPlacePage);
  }

  startRun(){
    this.runMode = true;
  }

  endRun(){
    this.runMode = false;
  }
}
