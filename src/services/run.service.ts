import { Run } from "../interfaces/run";
import { Place } from "../interfaces/place";
import firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import 'rxjs/Rx';

@Injectable()
export class RunService {
    private currentRun:Run;
    constructor(private http: HttpClient){
         this.currentRun = new Run('',0,0,[]);

    }

    addPlaceToCurrentRun(place:Place){
        this.currentRun.places.push(place);
        console.log(this.currentRun);
    }

    getCurrentPlaces(){
        return this.currentRun.places.slice();
    }

    removeCurrentPlace(index){
        this.currentRun.places.splice(index,1);
    }

    saveCurrentRunToDB(){
        let currentUserId = firebase.auth().currentUser.uid;
        firebase.auth().currentUser.getIdToken()
        .then(token=>{
            this.http.put('https://runplaces-e4562.firebaseio.com/' + currentUserId + '/saved-runs.json?auth=' + token, this.currentRun).subscribe((response: Response)=>{
                console.log(response);
                console.log('got here');
            });
        });
    }
}