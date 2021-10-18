import { FormGroup } from '@angular/forms';

export function MustMatch(password: string, passwordComfirm: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[password];
        const matchingControl = formGroup.controls[passwordComfirm];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true })
            console.log();
        } else {
            matchingControl.setErrors(null);
        }
    }
}
