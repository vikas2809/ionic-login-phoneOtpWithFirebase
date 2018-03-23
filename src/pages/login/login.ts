import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { NgForm } from '@angular/forms';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '../../services/validation';
import * as CryptoJS from 'crypto-js';
import { UserService } from '../../services/user';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  phoneNumberForm: FormGroup;
  userDetail:any;

  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;

  constructor(private navController:NavController, 
              private alertController: AlertController, 
              private toastController: ToastController,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private storage: Storage){

                this.phoneNumberForm = this.formBuilder.group({
                  phoneNumber: ['', [Validators.required, ValidationService.phoneValidator]]
                })
              }

    ngOnInit(){
      window['phoneRecaptchaVerifier'] = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': function(response) {
          // reCAPTCHA solved - will proceed with submit function
        },
        'expired-callback': function() {
          // Reset reCAPTCHA?
        }
      });
    }

  ionViewDidLoad(){
   // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
  }

  onSignUp(){
    this.navController.push(SignUpPage);
  }

  verifyPhoneNumber(){
    if (this.phoneNumberForm.dirty && this.phoneNumberForm.valid) {
      let phoneNumber=this.phoneNumberForm.value.phoneNumber;
        console.log(phoneNumber);
        console.log(typeof phoneNumber);
        const appVerifier = this.recaptchaVerifier;
        let mobileNumber=parseInt(phoneNumber);
        console.log(typeof mobileNumber);
        const phoneNumberString = "+91" + mobileNumber;
        console.log(phoneNumberString);
        firebase.auth().signInWithPhoneNumber(phoneNumberString, window['phoneRecaptchaVerifier']).then(function(confirmationResult){
          var code = prompt('We have send a code to ' + phoneNumberString + ', please enter it here', "");
          if (code) {
            confirmationResult.confirm(code).then(function (result) {
              // User signed in successfully.
              // Reset reCAPTCHA?
              // ...
            }).catch(function (error) {
              // User couldn't sign in (bad verification code?)
              // Reset reCAPTCHA?
              // ...
            });
          }
        }).catch(function(error){
          console.log(error.message);
        });
      //   firebase.auth().signInWithPhoneNumber(phoneNumberString,appVerifier)
      //   .then((confirmationResult)=>{
      //     console.log(confirmationResult);
      //     let prompt = this.alertController.create({
      //       title: 'Enter the Confirmation code',
      //       inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
      //       buttons: [
      //         { text: 'Cancel',
      //           handler: data => { console.log('Cancel clicked'); }
      //         },
      //         { text: 'Send',
      //           handler: data => {
      //             confirmationResult.confirm(data.confirmationCode)
      //               .then( (result)=> {
      //                 this.navController.push(HomePage);
      //               }).catch( (error)=> {
      //                 console.log(error);
      //                 const toast=this.toastController.create({
      //                   message: error.message,
      //                   duration: 2500,
      //                 })
      //                 toast.present();
      //               });
      //           }
      //         }
      //       ]
      //     });
      //     prompt.present();
    
      //   })
      //   .catch(error=>{
      //     console.log("SMS not sent", error);
      //   })
       }     
  }

  onSubmitForm( form: NgForm ) {
    console.log(form.value.username);
    console.log(form.value.password);
    if(form.value.username!==undefined&&form.value.password!==undefined)
    {
      var key = CryptoJS.enc.Base64.parse("#base64Key#");
      var iv  = CryptoJS.enc.Base64.parse("#base64IV#");
      let email = form.value.username
      var encrypted = CryptoJS.AES.encrypt(form.value.password, key, {iv: iv});
      this.userDetail={
        email,
        password:encrypted.toString()
      }
        this.userService.authenticateUser(this.userDetail).subscribe((response)=>{
          console.log(response);
          if(response.success===false)
          {
            console.log(response.message);
            const toast = this.toastController.create({
              message:  response.message,
              duration: 2500
            })
            toast.present();
          }
         
        if(response.success===true)
        {
          console.log(response.token);
          console.log(typeof response.token)
          this.storage.set('token',response.token);
          this.navController.push(HomePage);
        }
        });
    }
  }

  facebook(){
    console.log('facebook');
  }

  google(){
    console.log('google');
  }

}
