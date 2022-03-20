import { TranslateService } from '@ngx-translate/core';
import { NumberToTextController } from './../../../shared/controllers/numberdata-to-text-changer.controller';
import { TimeTableResultDisplayDialogComponent } from '../time-table-result-display-dialog/time-table-result-display-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimeTableInputInterface } from '../interfaces/time-table-input.interface';

@Component({
    selector: 'app-time-table-result-display',
    templateUrl: './time-table-result-display.component.html',
    styleUrls: ['./time-table-result-display.component.css']
})

export class TimeTableResultDisplayComponent implements OnInit {

    hours: string[] = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
    daySortedData: TimeTableInputInterface[][] = [[],[],[],[],[],[]];
    wasLoaded = false;
    currentDivs: string[][][] = [[],[],[],[],[],[]];
    savedDivs: string[][][][] = [];
    savedHtmlElements: HTMLElement[][] = [];
    generationIndex = 0;
    maxGenerationIndex = 0;
    maxPriority = 0;

    constructor(
        public matDialog: MatDialog,
        private NumberToTextController: NumberToTextController,
        private translateService: TranslateService
    ) { 
        this.daySortedData = JSON.parse(localStorage.getItem('TimeTableDaySortedData') || '[[],[],[],[],[],[]]');
    }

    ngOnInit(): void {
        this.daySortedData = JSON.parse(localStorage.getItem('TimeTableDaySortedData') || '[[],[],[],[],[],[]]');
        this.daySortedData.forEach(element => {
            element.forEach(element => {
                if(element.PRIORITY > this.maxPriority) this.maxPriority = element.PRIORITY;
            });
        });
    }

    onResize() {
        for (let index = 0; index < this.currentDivs.length - 1; index++) {
            this.currentDivs[index].forEach(element => {
                const div = document.getElementById(element[0]);
                const i = index;
                const j = parseInt(element[1]);
                if(div){
                    const startTime = this.daySortedData[i][j].CLASS_START_TIME.replace(':', '');
        div!.style.width = document.getElementById(this.daySortedData[i][j].DAY)?.offsetWidth! - 10  + 'px';
        div!.style.top = document.getElementById(this.daySortedData[i][j].DAY)!.getBoundingClientRect().bottom +
                        this.timeDifferenceInMinute('7:00', startTime) + 'px';
        div!.style.left = (document.getElementById(this.daySortedData[i][j].DAY)!.getBoundingClientRect().x 
                        - document.getElementById('mainCard')!.getBoundingClientRect().left) + 4 + 'px';
                }
            });
        }
    }

    tableDataFiller() {
        if (this.wasLoaded == false ) {
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < this.daySortedData[i].length; j++) {
                    if (this.daySortedData[i].length != 0) {
                        if(this.isTimeSlotAvailable(this.daySortedData[i][j].CLASS_START_TIME, this.daySortedData[i][j].CLASS_END_TIME, i)){
                            const div = document.createElement('div');
                            const actualElement = this.daySortedData[i][j];
                            div.innerHTML = actualElement.SUBJECT_NAME + ', <br>' 
                                            + actualElement.CLASS_START_TIME + '-' + actualElement.CLASS_END_TIME;
                            div.title = div.innerHTML;
                            div.id = 'div' + i + j;
                            div.style.backgroundColor = actualElement.COLOR != null ? actualElement.COLOR : 'red';
                            div.style.position = 'absolute';
                            div.style.overflow = 'hidden';
                            div.style.textOverflow = 'ellipsis';
                            div.onclick=() => {this.openInfoDialog(actualElement);};
                            div.style.border = '1px'; div.style.borderStyle = 'solid'; 
                            const startTime = actualElement.CLASS_START_TIME;
                            const endTime = actualElement.CLASS_END_TIME;
                            div.style.height = this.timeDifferenceInMinute(startTime, endTime).toString() + 'px';
                            div.style.fontSize = '20px';
                            div.style.fontWeight = 'bold';
                            div.style.width = document.getElementById(actualElement.DAY)?.offsetWidth! - 10 + 'px';
                            div.style.top = (document.getElementById(actualElement.DAY)!.getBoundingClientRect().bottom 
                            - document.getElementById('mainCard')!.getBoundingClientRect().top)
                            + this.timeDifferenceInMinute('7:00', startTime) + 'px';
                            div.style.left = (document.getElementById(actualElement.DAY)!.getBoundingClientRect().x 
                            - document.getElementById('mainCard')!.getBoundingClientRect().left) + 4 + 'px';
                            document.getElementById('table')?.append(div);
                            this.currentDivs[i].push([div.id, j.toString()]);
                        }
                    }
                }
            }
            this.saveHTMLElements();
            this.saveDivs();
            this.wasLoaded = true;
            this.maxGenerationIndex++;
        }
    }

    openInfoDialog(element) {
        this.matDialog.open(TimeTableResultDisplayDialogComponent, {data: {element: element}});
    }

    timeDifferenceInMinute(start: string, end: string): number {
        const startTime = start.split(':'); const endTime = end.split(':');
        return ((parseInt(endTime[0]) - parseInt(startTime[0]))*60 + parseInt(endTime[1]) - parseInt(startTime[1]));
    }

    isTimeSlotAvailable(start: string, end: string, i: number) : boolean {
        const startTime: number = parseInt(start.replace(':', '')); const endTime: number = parseInt(end.replace(':', ''));
        let available = false;
        if (this.currentDivs[i].length == 0) return true;
        for(const element of this.currentDivs[i]) {
            const elementStartTime = parseInt(this.daySortedData[i][element[1]].CLASS_START_TIME.replace(':',''));
            const elementEndTime = parseInt(this.daySortedData[i][element[1]].CLASS_END_TIME.replace(':',''));
            if (startTime < elementStartTime && endTime > elementEndTime) {
                available = false;
                break;
            }
            else if (endTime <= elementStartTime || startTime >= elementEndTime) available = true; // egyenlő???
            //else if (startTime > elementEndTime) available = true;
            else {
                available = false;
                break;
            }
        }
        return available;
    }

    newGeneration() {
        this.generationIndex++;
        if (this.generationIndex == this.maxGenerationIndex) {
            if (this.maxGenerationIndex < this.maxPriority) {
                for(const days of this.daySortedData) {
                    for(const element of days) {
                        if (element.PRIORITY > 0) {
                            element.PRIORITY--;
                        }
                    }
                }  
                this.sortingByPriority();
            }
            else {
                this.sortingByRandomOrder();
            }
            this.clearHTMLElements();
            this.currentDivs = [[],[],[],[],[],[],[]];
            this.wasLoaded = false;
            this.tableDataFiller();
        }
        else{
            this.clearHTMLElements();
            this.loadHTMLElements();
            this.loadDivs();
        }
    }

    previousGeneration() {
        if (this.generationIndex > 0) {
            this.clearHTMLElements();
            this.generationIndex--;
            this.loadDivs();
            this.loadHTMLElements();
        }
    }

    sortingByPriority() {
        for (let day = 0; day < 6; day++) {
            this.daySortedData[day].sort((first,second) => second.PRIORITY - first.PRIORITY);
            for (let index = 0; index < this.daySortedData[day].length - 1; index++) {
                if (this.daySortedData[day][index].PRIORITY == this.daySortedData[day][index+1].PRIORITY) {
                    if (parseInt(this.daySortedData[day][index].SUBJECT_WEIGHT) < parseInt(this.daySortedData[day][index+1].SUBJECT_WEIGHT)) {
                        const temp = this.daySortedData[day][index];
                        this.daySortedData[day][index] = this.daySortedData[day][index+1];
                        this.daySortedData[day][index+1] = temp;
                    }
                }
            }
        }
    }

    sortingByRandomOrder() {
        for (let index = 0; index < 6; index++)
            this.daySortedData[index].sort(() => Math.random() - 0.5);
    }

    clearHTMLElements() {
        for(const divs of this.currentDivs) {
            for(const element of divs) {
                document.getElementById(element[0])?.remove();
            }
        }
    }

    saveHTMLElements() {
        this.savedHtmlElements.push([]);
        for(const divs of this.currentDivs) {
            for(const element of divs) {
                this.savedHtmlElements[this.generationIndex].push(document.getElementById(element[0])!);
            }
        }
    }

    loadHTMLElements() {
        for(const element of this.savedHtmlElements[this.generationIndex]){
            document.getElementById('table')?.append(element);
        }
    }

    saveDivs() {
        this.savedDivs.push(this.currentDivs);
    }

    loadDivs() {
        this.currentDivs = this.savedDivs[this.generationIndex];
    }
}

