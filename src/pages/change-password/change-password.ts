import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import firebase from 'firebase';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  onChangePassword(form:NgForm){
    const user = firebase.auth().currentUser;
    const newPassword = form.value.password;

    user.updatePassword(newPassword).then(() => {
      let alert = this.alertCtrl.create({
        title: 'Password changed',
        buttons: ['Dismiss']
        });
        alert.present(); 
    }).catch(() => {
      let alert = this.alertCtrl.create({
        title: 'Error changing password',
        buttons: ['Dismiss']
        });
        alert.present();
    });
  }

}
