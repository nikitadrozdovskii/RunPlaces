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
  pace = 0;
  previousLoc = {lat:0,long:0};
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
      //set initial coordinates for previous
      this.previousLoc.lat = this.lat;
      this.previousLoc.long= this.long;
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
    let currLat =position.coords.latitude;
    let currLong = position.coords.longitude;
    let myLatlng = new google.maps.LatLng(currLat, currLong);
    this.marker.setPosition(myLatlng);
    this.map.setCenter(myLatlng);
    console.log(myLatlng);

    //calculate distacne between this and last location
    let distance = this.getDistanceFromLatLonInKm(this.previousLoc.lat,this.previousLoc.long,currLat,currLong);
    console.log(distance);
    this.previousLoc.lat = currLat;
    this.previousLoc.long = currLong;
    
}, onError, { timeout: 30000 });
  }


  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    console.log(lat1,lon1, lat2,lon2);
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
 deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}
