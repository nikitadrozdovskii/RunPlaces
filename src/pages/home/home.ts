import { Component, ApplicationRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Run } from '../../interfaces/run';
import { Place } from '../../interfaces/place';
import { TabsPage } from '../tabs/tabs';
import { RunService } from '../../services/run.service';
import firebase from "firebase";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  request;
  service;
  map;
  runs: Run[] =[];
  isAuthenticated = false;

  constructor(public navCtrl: NavController, private appRef: ApplicationRef, private runService: RunService) {
  }

  ionViewWillEnter(){

    firebase.auth().onAuthStateChanged(user=>{
      if (user){
        this.isAuthenticated = true;
        firebase.auth().currentUser.getIdToken()
        .then(token=>{
          this.runService.getSavedRunsFromDB(token).subscribe((response: Response)=>{
            let returnedRuns = [];
            (<any>Object).values(response).forEach(value => {
                returnedRuns.push(value);
            });
             console.log(returnedRuns);
             this.runs= returnedRuns;
         });
        });
      } else {
        this.isAuthenticated = false;
      }
  });
}
}