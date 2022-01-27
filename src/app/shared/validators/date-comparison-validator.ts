import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export function DateComparisonValidator(dateCompareControlName: string) {

    let thisDateControl: AbstractControl;
    let otherDateControl: AbstractControl;

    return function DateComparisonValidator(control: AbstractControl): ValidationErrors | null {
        if (!control.parent) {
            return null;
        }
        if (!thisDateControl) {
            thisDateControl = control;
            otherDateControl = control.parent.get(dateCompareControlName) as AbstractControl;
            if (!otherDateControl) {
                throw new Error('dateLessThanOrEqualsValidator(): other control is not found in parent group');
            }
            otherDateControl.valueChanges.subscribe(() => {
                thisDateControl.updateValueAndValidity();
            });
        }
        if (!otherDateControl || !otherDateControl.value) {
            return null;
        }
        const date1 = thisDateControl.value;
        const date2 = otherDateControl.value;
        if (date1 !== null && date2 !== null && date1 > date2) {
            return {
                'date_less_than_or_equal': true
            };
        }
        return null;
    };
}
