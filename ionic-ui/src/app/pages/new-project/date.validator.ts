import {AbstractControl} from '@angular/forms';

export class DateValidator {

    static CheckDates(control: AbstractControl) {
       let start = control.get('start').value;

       let end = control.get('end').value;

        if(start > end) {
            control.get('end').setErrors( {EndDatesMissmatch: true} );
        } else {
            return null
        }
    }
}
