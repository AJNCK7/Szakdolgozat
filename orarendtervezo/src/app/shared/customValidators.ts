import { FormGroup } from '@angular/forms';
    
export function ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}

export function startTimeIsGreaterThanEndTime(startTime: string, endTime: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[startTime];
        const matchingControl = formGroup.controls[endTime];
        if (matchingControl.errors && !matchingControl.errors.startTimeIsGreaterThanEndTime) {
            return;
        }
        if (parseInt(control.value.replace(':', '')) > parseInt(matchingControl.value.replace(':', '')) ||
            parseInt(control.value.replace(':', '')) == parseInt(matchingControl.value.replace(':', ''))) {
            matchingControl.setErrors({ startTimeIsGreaterThanEndTime: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}