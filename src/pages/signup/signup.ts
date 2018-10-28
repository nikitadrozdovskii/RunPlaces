import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form: NgForm){
    this.authService.signup(form.value.email, form.value.password)
      .then(data => console.log(data))
      .catch(error => {
        const alert = this.alertCtrl.create({
          title: "Sign up error",
          message: error.message,
          buttons: ["dismiss"]
        });
        alert.present();
      });
  }

}
