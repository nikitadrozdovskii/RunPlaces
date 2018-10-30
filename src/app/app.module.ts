import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NewRunPage } from '../pages/new-run/new-run';
import { AddPlacePage } from '../pages/add-place/add-place';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth.service';
import { RunService } from '../services/run.service';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ReauthPage } from '../pages/reauth/reauth';
import { ForgotPassPage } from '../pages/forgot-pass/forgot-pass';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    NewRunPage,
    AddPlacePage,
    SigninPage,
    SignupPage,
    ChangePasswordPage,
    ReauthPage,
    ForgotPassPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    NewRunPage,
    AddPlacePage,
    SigninPage,
    SignupPage,
    ChangePasswordPage,
    ReauthPage,
    ForgotPassPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    RunService
  ]
})
export class AppModule {}
