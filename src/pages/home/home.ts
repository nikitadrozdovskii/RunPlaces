import { Component, ApplicationRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Run } from '../../interfaces/run';
import { Place } from '../../interfaces/place';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  request;
  service;
  map;
  runs: Run[] =[];

  constructor(public navCtrl: NavController, private appRef: ApplicationRef) {
    this.runs = [new Run("10/2/2018",2.9,460,[new Place("Oxford square"),new Place("Grove")]),
    new Run("9/30/2018",3,480,[new Place("Faulkner's house"),new Place("Grove")]),
    new Run("9/27/2018",2,500,[new Place("Lyceum"),new Place("Lamar Park")])]
  }


}
