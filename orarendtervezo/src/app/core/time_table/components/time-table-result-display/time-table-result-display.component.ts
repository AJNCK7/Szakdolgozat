import { TimeTableResultDisplayDialogComponent } from '../time-table-result-display-dialog/time-table-result-display-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimeTableInputInterface } from '../../interfaces/time-table-input.interface';

@Component({
    selector: 'app-time-table-result-display',
    templateUrl: './time-table-result-display.component.html',
    styleUrls: ['./time-table-result-display.component.css']
})

export class TimeTableResultDisplayComponent implements OnInit {

    hours: string[] = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
    daySortedData: TimeTableInputInterface[][] = [[],[],[],[],[],[]];
    dataSource: TimeTableInputInterface[] = [];
    wasLoaded = false;
    currentDivs: string[][][] = [[],[],[],[],[],[]];
    savedDivs: string[][][][] = [];
    savedHtmlElements: HTMLElement[][] = [];
    generationIndex = 0;
    maxGenerationIndex = 0;
    maxPriority = 0;
    sameSubjectGroupNames: string[] = [];

    constructor(
        public matDialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.dataSource = JSON.parse(localStorage.getItem('TimeTableInputDatas') || '[]');
        this.sameSubjectGroupNames = JSON.parse(localStorage.getItem('SameSubjectGroups') || '[]');
        this.priorityOptimalize();
        this.sorting(true);
    }

    sorting(inOrder: boolean) {
        this.daySortedData = [[],[],[],[],[],[]];
        if(inOrder) this.sortDesc();
        else this.sortingByRandomOrder();
        const usedGroupNames: Array<number> = [];
        this.dataSource.forEach(element => {
            if(usedGroupNames.includes(element.SUBJECT_GROUP)) return;
            let contain = false;
            this.daySortedData.forEach((_ , index) => {
                if(contain) return;
                this.daySortedData[index].forEach(dayElement => {
                    if(element.SUBJECT_GROUP == dayElement.SUBJECT_GROUP) {
                        contain = true;
                        usedGroupNames.push(element.SUBJECT_GROUP);
                        return;
                    }
                });
            });
            if(!contain) {
                this.daySortedData[element.DAY].push(element);
            }
        });
    }

    sortDesc() {
        this.dataSource.sort((first,second) => second.PRIORITY - first.PRIORITY);
        this.dataSource.sort((first,second) => {
            if(first.PRIORITY == second.PRIORITY) {
                return parseInt(second.SUBJECT_WEIGHT) - parseInt(first.SUBJECT_WEIGHT);
            } 
            else return parseInt(first.SUBJECT_WEIGHT);
        });
    }

    priorityOptimalize(): void {
        const priorityQuantity: Array<number> = [];
        this.dataSource.forEach(element => {
            if(!priorityQuantity.includes(element.PRIORITY)) {
                priorityQuantity.push(element.PRIORITY);
            }
        });
        priorityQuantity.sort((a,b) => a - b);
        if(priorityQuantity.length < 9) {
            this.dataSource.forEach(element => {
                element.PRIORITY = priorityQuantity.indexOf(element.PRIORITY);
            });
            this.maxPriority = priorityQuantity.length;
        }
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
                        if(this.isTimeSlotAvailable(this.daySortedData[i][j].CLASS_START_TIME, this.daySortedData[i][j].CLASS_END_TIME, i)) {
                            const div = document.createElement('div');
                            const actualElement = this.daySortedData[i][j];
                            div.innerHTML = this.sameSubjectGroupNames[actualElement.SUBJECT_GROUP] + ', <br>' 
                                            + actualElement.CLASS_START_TIME + '-' + actualElement.CLASS_END_TIME;
                            div.title = actualElement.SUBJECT_GROUP + ', ' 
                                + actualElement.CLASS_START_TIME + '-' + actualElement.CLASS_END_TIME ;
                            div.id = 'div' + i + j;
                            div.style.backgroundColor = actualElement.COLOR != null ? actualElement.COLOR : 'red';
                            div.style.position = 'absolute';
                            div.style.overflow = 'hidden';
                            div.style.textOverflow = 'ellipsis';
                            div.onclick=() => { this.openInfoDialog(actualElement); };
                            div.style.border = '1px';
                            div.style.borderStyle = 'solid'; 
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
            else if (startTime >= elementEndTime || endTime <= elementStartTime ) {
                available = true;
            } else {
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
                for(const data of this.dataSource) {
                    if (data.PRIORITY > 0) {
                        data.PRIORITY--;
                    }
                }  
                this.sorting(true);
            } else {
                this.sorting(false);
            }
            this.clearHTMLElements();
            this.currentDivs = [[],[],[],[],[],[]];
            this.wasLoaded = false;
            this.tableDataFiller();
        } else {
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

    sortingByRandomOrder() {
        this.dataSource.sort(() => Math.random() - 0.5);        
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

