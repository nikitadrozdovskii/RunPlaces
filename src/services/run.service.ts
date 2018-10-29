import { Run } from "../interfaces/run";
import { Place } from "../interfaces/place";

export class RunService {
    private currentRun:Run;
    constructor(){
         this.currentRun = new Run('',0,0,[]);

    }

    addPlaceToCurrentRun(place:Place){
        this.currentRun.places.push(place);
        console.log(this.currentRun);
    }

    getCurrentPlaces(){
        return this.currentRun.places.slice();
    }
}