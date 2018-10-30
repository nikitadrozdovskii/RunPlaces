import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ForgotPassPage } from '../forgot-pass/forgot-pass';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignin(form: NgForm){
    this.authService.signin(form.value.email, form.value.password)
    .then (data=>{console.log(data)})
    .catch(error => {
      const alert = this.alertCtrl.create({
        title: "Sign in error",
        message: error.message,
        buttons: ["Dismiss"]
      });
      alert.present();
    });
  }

  onForgotPassword(){
    this.navCtrl.push(ForgotPassPage);
  }

}
