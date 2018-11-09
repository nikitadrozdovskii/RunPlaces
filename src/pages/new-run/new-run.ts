import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Place } from '../../interfaces/place';
import { AddPlacePage } from '../add-place/add-place';
import { RunService } from '../../services/run.service';
import { Geolocation } from '@ionic-native/geolocation';

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
  long:any =0;
  lat:any =0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private runService:RunService
    ,private geolocation: Geolocation) {
    this.toRun = [{place:new Place("Oxford square"),visited:true},
    {place:new Place("Faulkner's house"), visited:false}];
  }

  ionViewWillEnter(){
    this.loadPlacesFromService();
  }

  loadPlacesFromService(){
    let currentPlaces = this.runService.getCurrentPlaces();
    let unvisitedPlaces = [];
    currentPlaces.forEach(place=>{
      unvisitedPlaces.push({place:place, visited:false});
    });
    this.toRun = unvisitedPlaces;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRunPage');
    this.getLocation();
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

  removeCurrentPlace(index){
    this.runService.removeCurrentPlace(index);
    this.loadPlacesFromService();
  }

  savePlaces(){
    this.runService.saveCurrentRunToDB();
  }

  getLocation(){

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.long = resp.coords.latitude;
      this.lat = resp.coords.longitude;
     }).catch((error) => {
      this.long = error;
     });
  }

}
