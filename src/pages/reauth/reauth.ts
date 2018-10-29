import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import firebase from 'firebase';
import { ChangePasswordPage } from '../change-password/change-password';

/**
 * Generated class for the ReauthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reauth',
  templateUrl: 'reauth.html',
})
export class ReauthPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReauthPage');
  }

    onReauth(form:NgForm){
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email, 
        form.value.password
    );
      user.reauthenticateWithCredential(credential);
      this.navCtrl.push(ChangePasswordPage);
    }
}
