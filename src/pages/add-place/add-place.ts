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
  results = [];
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(-33.8617374,151.2021291),
    zoom: 15
  });

  service = new google.maps.places.PlacesService(this.map);
  constructor(public navCtrl: NavController, public navParams: NavParams, private runService: RunService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  findPlace(form: NgForm){
    const request = {
      query: form.value.name,
      fields: ['photos', 'formatted_address', 'name', 'geometry'],
    };
  
    this.service.findPlaceFromQuery(request, (results,status)=>{
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.results=results;
        console.log(results);
      }
    });
  }
    // this.runService.addPlaceToCurrentRun(new Place(form.value.name));
    // this.navCtrl.pop();

    addPlaceToRun(){
    this.runService.addPlaceToCurrentRun(new Place(this.results[0].name));
    this.navCtrl.pop();

    }
  }

