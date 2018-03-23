import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(private navController: NavController){}

  onSignUp(){
    this.navController.push(SignUpPage);
  }

  onSignIn(){
    this.navController.push(LoginPage);
  }

}
