// import { AbstractControl } from '@angular/forms';

export class ValidationService {
 
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      let config = {
          'required': 'Required',
          'invalidEmailAddress': 'Invalid email address',
          'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
          'invalidName': 'Invalid name. Name must at least 3 characters long, and contain only alphabets.',
          'invalidPhoneNumber': 'Invalid Phone Number. Please provide correct phone number',
          'minlength': `Minimum length ${validatorValue.requiredLength}`,
          'matchPassword': 'password doesnot match'
      };

      return config[validatorName];
  }

  static emailValidator(control) {
      // RFC 2822 compliant regex
      if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
          return null;
      } else {
          return { 'invalidEmailAddress': true };
      }
  }

  static passwordValidator(control) {
      // {6,100}           - Assert password is between 6 and 100 characters
      // (?=.*[0-9])       - Assert a string has at least one number
      if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
          return null;
      } else {
          return { 'invalidPassword': true };
      }
  }

// static phoneValidator(control){
//     //{10}       - Assert phone number of exactly 10 characters 
//     //regex for indian local mobile number validation and for Indian international .
//     if(control.value.match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/)){
//         return null;
//     }
//     else{
//         return {'invalidPhoneNumber':true};
//     }
// }
  // static resetPasswordValidator(control)
  // {
  //   // {8,100 }           - Assert password is bw 8 and 100 characters
  //   // ()
  // }


  static phoneValidator(control){
    //{10}       - Assert phone number of exactly 10 characters 
    //regex for indian local mobile number validation and for Indian international .
    if(control.value.match(/^[789]\d{9}$/)){
        return null;
    }
    else{
        return {'invalidPhoneNumber':true};
    }
}

 


  static confirmPasswordValidator(control)
  {
      // {6,100}           - Assert password is between 6 and 100 characters
      // (?=.*[0-9])       - Assert a string has at least one number
      if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
        return null;
    } else {
        return { 'invalidPassword': true };
    }
  }
  static nameValidator(control)
  {
      if(control.value.match(/^([a-zA-Z]){3,50}$/)){
        return null;
      }else{
        return { 'invalidName':true};
      }
  }
}