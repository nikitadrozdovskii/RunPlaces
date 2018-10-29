import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  onChangePassword(form:NgForm){
    const user = firebase.auth().currentUser;
    const newPassword = form.value.password;

    user.updatePassword(newPassword).then(function() {
      console.log('Update successful.'); 
    }).catch(function(error) {
      console.log('// An error happened.');
    });
  }

}
