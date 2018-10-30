import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import firebase from 'firebase';

/**
 * Generated class for the ForgotPassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-pass',
  templateUrl: 'forgot-pass.html',
})
export class ForgotPassPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPassPage');
  }

  onReset(form:NgForm){
    var auth = firebase.auth();
    var emailAddress = form.value.email;

    auth.sendPasswordResetEmail(emailAddress).then(() => {
    let alert = this.alertCtrl.create({
    title: 'Reset link sent',
    subTitle: 'please check your email',
    buttons: ['Dismiss']
    });
    alert.present();

    }).catch(() => {
      // An error happened.
      let alert = this.alertCtrl.create({
        title: 'Something went wrong',
        subTitle: 'Is email',
        buttons: ['Dismiss']
        });
        alert.present();
    });
  }

}
