import {AbstractControl} from '@angular/forms';

export class PasswordValidator {

    static MatchPassword(control: AbstractControl) {
       const password = control.get('password1').value;

       const confirmPassword = control.get('password').value;

        if (password != confirmPassword) {
            control.get('password').setErrors( {ConfirmPassword: true} );
        } else {
            return null;
        }
    }
}
