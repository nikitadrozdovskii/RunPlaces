import { Component } from "@angular/core";
import { HomePage } from "../home/home";
import { NewRunPage } from "../new-run/new-run";

@Component({
    selector:"page-tabs",
    template:`
        <ion-tabs>
        <ion-tab [root]="home" tabTitle="History" tabIcon="clipboard"></ion-tab>
        <ion-tab [root]="newrun" tabTitle="Start run" tabIcon="stopwatch"></ion-tab>
        </ion-tabs>
    `
})
export class TabsPage{
    home= HomePage;
    newrun = NewRunPage;
}