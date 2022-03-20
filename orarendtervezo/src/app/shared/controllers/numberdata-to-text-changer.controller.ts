import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NumberToTextController {

    dayChanger(day: string){
        switch (day) {
        case '0': return 'DAYS.MONDAY';
        case '1': return 'DAYS.TUESDAY';
        case '2': return 'DAYS.WEDNESDAY';
        case '3': return 'DAYS.THURSDAY';
        case '4': return 'DAYS.FRIDAY';
        case '5': return 'DAYS.SATURDAY';
        default: return 'Error';
        }
    }

    subjectWeightChanger(subjectWeight: string){
        switch (subjectWeight) {
        case '2': return 'TIME_TABLE_INPUTS.SUBJECT_WEIGHT.MANDATORY';
        case '1': return 'TIME_TABLE_INPUTS.SUBJECT_WEIGHT.MANDATORY_OPTIONAL';
        case '0': return 'TIME_TABLE_INPUTS.SUBJECT_WEIGHT.OPTIONAL';
        default: return 'Error';
        }
    }
}