import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Place } from '../../interfaces/place';
import { AddPlacePage } from '../add-place/add-place';
import { RunService } from '../../services/run.service';
import { Geolocation } from '@ionic-native/geolocation';
import { } from '@types/googlemaps';

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
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  marker: any;
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
    this.startTrack();
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
    //get current position, initialize google maps and marker
    this.geolocation.getCurrentPosition(options).then((resp) => {
      //truncated to 4 dec places
      this.lat = Math.floor(resp.coords.latitude * 100000)/100000;
      this.long = Math.floor(resp.coords.longitude * 100000)/100000;
      let myLatLng = new google.maps.LatLng(this.lat, this.long);
      var mapProp = {
      center: myLatLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: 'Hello World!'
    });
     }).catch((error) => {
      this.long = error;
     });
  }

  startTrack(){

  // onError Callback receives a PositionError object
  //
  function onError(error) {
    console.log("error!!!" + error);
  }

  // Options: throw an error if no update is received every 30 seconds.
  //
  var watchID = navigator.geolocation.watchPosition((position) => {
    console.log(position);
    //recenter map + marker
    let myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.marker.setPosition(myLatlng);
    this.map.setCenter(myLatlng);
    console.log(myLatlng);
}, onError, { timeout: 30000 });
  }

}
