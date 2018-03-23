import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { AuthService } from '../services/auth';
import { HttpModule } from '@angular/http';
import { ValidationService } from '../services/validation';
import { DatePipe } from '@angular/common';
import { UserService } from '../services/user';
import { IonicStorageModule } from '@ionic/storage';
import { ControlMessagesComponent } from '../components/control-messages/control-messages';



@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    HomePage,
    LoginPage,
    SignUpPage,
    ControlMessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    HomePage,
    LoginPage,
    SignUpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    UserService,
    DatePipe,
    ValidationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
