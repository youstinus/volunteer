/*import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

export class PasswordValidator {
  
  constructor() {
    console.log('Hello ErrorHandlerProvider Provider')
  }
  // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
  /*static areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;

    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];

        if (val === undefined) {
          val = control.value
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
// Validation for password and confirm password
static MatchPassword(AC: AbstractControl) {
  console.log('dabar isspausdinam reiksmes');
  console.log(AC.get('password1').value);
  console.log(AC.get('password').value);
  const newPassword = AC.get('password1').value // to get value in input tag
  const confirmPassword = AC.get('password').value // to get value in input tag
   if(newPassword != confirmPassword) {
       console.log('false');
       AC.get('confirmPassword').setErrors( { MatchPassword: true } )
   } else {
       console.log('true')
       AC.get('confirmPassword').setErrors(null);
   }
}

}*/

import {AbstractControl} from '@angular/forms';

export class PasswordValidator {

    static MatchPassword(control: AbstractControl) {
       let password = control.get('password1').value;

       let confirmPassword = control.get('password').value;

        if(password != confirmPassword) {
            control.get('password').setErrors( {ConfirmPassword: true} );
        } else {
            return null
        }
    }
}
