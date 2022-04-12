import { Component, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { startTimeIsGreaterThanEndTime } from 'src/app/shared/customValidators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TimeTableInputInterface } from '../../../../interfaces/time-table-input.interface';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent{

    subjectNameMaxLengthParam = {value: '40'};
    classroomMaxLengthParam = {value: '10'};
    teacherMaxLengthParam = {value: '40'};
    priorityMaxLengthParam = {value: '1'};
    creditMaxLengthParam = {value: '2'};
    form: FormGroup = new FormGroup({});
    data: TimeTableInputInterface;

    sameSubjects: string[] = [];
    filteredOptions: Observable<string[]> | undefined;

    constructor (
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) comingData,
    private fb: FormBuilder,
    public authService: AuthService
    ) {
        this.data = comingData;
        this.dialogRef.disableClose = true;
        this.sameSubjects = JSON.parse(localStorage.getItem('SameSubjectGroups') || '[]');
        this.form = fb.group({
            subjectName: ['', [
                Validators.required,
                Validators.maxLength(40)
            ]],
            day: ['', [
                Validators.required,
            ]],
            subjectWeight: ['', [
                Validators.required,
            ]],
            classStartTime: ['', [
                Validators.required,
                Validators.pattern('([7-9]|1[0-9]):[0-5][0-9]')
            ]],
            classEndTime: ['', [
                Validators.required,
                Validators.pattern('([7-9]|1[0-9]):[0-5][0-9]')
            ]],
            classroom: ['', [
                Validators.maxLength(10)
            ]],
            teacher: ['', [
                Validators.maxLength(40)
            ]],
            credit: ['', [ 
                Validators.pattern('[0-9].{0,1}'),
            ]],
            priority: ['', [
                Validators.pattern('[0-9]'),
            ]],
            sameSubject: [''],
            colorPick: ['']
        }, {
            validator: [
                startTimeIsGreaterThanEndTime('classStartTime', 'classEndTime'), 
            ]
        });
        this.filteredOptions = this.form.get('sameSubject')!.valueChanges.pipe(
            startWith(''),
            map(value => this.filterValue(value)),
        );
    }

    get timeTableInputGet() {
        return this.form.controls;
    }

    cancelClick() {
        this.dialogRef.close();
    }

    private filterValue(value: string): string[] {
        return this.sameSubjects.filter(option => option.toLowerCase().includes(value));
    }
}
