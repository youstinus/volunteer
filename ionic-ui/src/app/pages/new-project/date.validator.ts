import {AbstractControl} from '@angular/forms';

export class DateValidator {

    static CheckDates(control: AbstractControl) {
       const start = control.get('start').value;

       const end = control.get('end').value;

        if (start > end) {
            control.get('end').setErrors( {EndDatesMissmatch: true} );
        } else {
            return null;
        }
    }
}
