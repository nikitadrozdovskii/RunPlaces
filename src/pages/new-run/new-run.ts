import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Place } from '../../interfaces/place';
import { AddPlacePage } from '../add-place/add-place';
import { RunService } from '../../services/run.service';
import { Geolocation } from '@ionic-native/geolocation';
import { } from '@types/googlemaps';
import { SaveRunPage } from '../save-run/save-run';

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
  sumPace = 0.0;
  avPace = 0;
  previousLoc = {lat:0,long:0,time:0};
  totalDistance = 0;
  paces=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private runService:RunService
    ,private geolocation: Geolocation
    ,private modalCtrl: ModalController) {
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

  //show popup with run data, offer to save it to DB or discard it
  endRun(){
    this.paces.splice(0,2); //remove first two unreliable values
    let sum = this.paces.reduce(function(a, b) { return a + b; }); //sum up
    let avg = sum / this.paces.length; //count average
    this.avPace = avg;
    //present modal offering to save run
    const modal = this.modalCtrl.create(SaveRunPage, {pace: this.avPace, distance:this.totalDistance});
    modal.present();
        //reset values
        this.runMode = false;
        this.pace = 0;
        this.sumPace = 0.0;
        this.avPace = 0;
        this.previousLoc = {lat:0,long:0,time:0};
        this.totalDistance = 0;
        this.paces=[];
  }

  removeCurrentPlace(index){
    this.runService.removeCurrentPlace(index);
    this.loadPlacesFromService();
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
      //set initial coordinates and time for previous
      this.previousLoc.lat = this.lat;
      this.previousLoc.long= this.long;
      this.previousLoc.time = resp.timestamp;
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
    //recenter map + marker
    let currLat =position.coords.latitude;
    let currLong = position.coords.longitude;
    let myLatlng = new google.maps.LatLng(currLat, currLong);
    this.marker.setPosition(myLatlng);
    this.map.setCenter(myLatlng);
    console.log(myLatlng);

    //calculate distacne between this and last location, update previous location
    let distance = this.getDistanceFromLatLonInKm(this.previousLoc.lat,this.previousLoc.long,currLat,currLong);
    this.totalDistance += distance*1.609; //add to total distance in miles
    this.previousLoc.lat = currLat;
    this.previousLoc.long = currLong;
    //calculate time between this and last location, update previous location
    let timePast = position.timestamp - this.previousLoc.time; //since last measurement
    this.previousLoc.time = position.timestamp;

    this.pace =(1/((distance/1.609)/(timePast/60000))); //current pace
    if (this.pace !== Infinity && !isNaN(this.pace)){
      this.avCount++;
      this.sumPace = this.sumPace + this.pace;
      this.paces.push(this.pace);
      console.log(this.paces);
      console.log("pace" + this.pace);
      console.log("sum" + this.sumPace);
    }

    

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
