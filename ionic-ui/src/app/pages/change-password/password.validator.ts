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
