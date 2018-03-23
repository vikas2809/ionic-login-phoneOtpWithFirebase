import { Component } from '@angular/core';
import { NavController, ToastController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation';
import { UserService } from '../../services/user';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  signUpForm: FormGroup;
  userDetail:any;
 constructor( private navController: NavController, 
              private formBuilder: FormBuilder, 
              private userService: UserService,
              private toastController: ToastController,
              private viewController: ViewController){
   this.signUpForm = this.formBuilder.group({
      'firstName': ['', [Validators.required,ValidationService.nameValidator]],
      'lastName' : ['', [Validators.required,ValidationService.nameValidator]],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required,ValidationService.passwordValidator]],
      'phone_number': ['', [Validators.required, ValidationService.phoneValidator]],
   })
 }

 onSignIn(){
  this.navController.push(LoginPage);   
  }

  registerUser(){
    if (this.signUpForm.dirty && this.signUpForm.valid) {
        console.log(this.signUpForm.value.firstName);
        console.log(this.signUpForm.value.lastName);
        console.log(this.signUpForm.value.email);
        console.log(this.signUpForm.value.password);
        console.log(this.signUpForm.value.phone_number);
        let date=Date.now();
        let updated_at=this.userService.transformDate(date);
        console.log(updated_at);
        let role='user';
         //Encrypt the Passwort with Base64
      var key = CryptoJS.enc.Base64.parse("#base64Key#");
      var iv  = CryptoJS.enc.Base64.parse("#base64IV#");
       //Impementing the Key and IV and encrypt the password
      var encrypted = CryptoJS.AES.encrypt(this.signUpForm.value.password, key, {iv: iv});
      this.userDetail={
        firstName:this.signUpForm.value.firstName,
        lastName:this.signUpForm.value.lastName,
        email:this.signUpForm.value.email,
        password:encrypted.toString(),
        phone_number:this.signUpForm.value.phone_number,
        role:role,
        created_at:"",
        updated_at:updated_at,
      }
      console.log(this.userDetail);
      this.userService.addUser(this.userDetail).subscribe((response)=>{
          console.log(response);
          if(response.success===true)
          {
            const toast = this.toastController.create({
              message: response.message,
              duration: 2500
            })
            toast.present();
            this.viewController.dismiss();
          }
          if(response.success===false)
          {
            const toast = this.toastController.create({
              message: response.message,
              duration: 2500
            })
            toast.present();
          }
      })
    }
  }

}
