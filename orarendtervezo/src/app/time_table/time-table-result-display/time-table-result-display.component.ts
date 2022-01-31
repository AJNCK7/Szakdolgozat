import { TimeTableResultDisplayDialogComponent } from './../time-table-result-display-dialog/time-table-result-display-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimeTableInputInterface } from '../time-table-input/time-table-input.component';

@Component({
  selector: 'app-time-table-result-display',
  templateUrl: './time-table-result-display.component.html',
  styleUrls: ['./time-table-result-display.component.css']
})

export class TimeTableResultDisplayComponent implements OnInit {

  hours: string[] = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  daySortedData: TimeTableInputInterface[][] = [[],[],[],[],[],[],[]];
  wasLoaded = false;
  currentDivs: string[][][] = [[],[],[],[],[],[],[]];
  savedDivs: string[][][][] = [];
  savedHtmlElements: HTMLElement[][] = [];
  generationIndex: number = -1;
  maxGenerationIndex: number = -1;

  constructor(public matDialog: MatDialog) { 
    this.daySortedData = JSON.parse(localStorage.getItem('TimeTableDaySortedData') || '[[],[],[],[],[],[],[]]');
  }

  ngOnInit(): void {
    this.daySortedData = JSON.parse(localStorage.getItem('TimeTableDaySortedData') || '[[],[],[],[],[],[],[]]');
  }

  onResize() {
    for (let index = 0; index < this.currentDivs.length - 1; index++) {
      this.currentDivs[index].forEach(element => {
        var div = document.getElementById(element[0]);
        var i = index;
        var j = parseInt(element[1]);
        const startTime = this.daySortedData[i][j].CLASS_START_TIME.replace(':', '');
        div!.style.width = document.getElementById(this.daySortedData[i][j].DAY)?.offsetWidth.toString() + "px";
        div!.style.top = document.getElementById(this.daySortedData[i][j].DAY)!.getBoundingClientRect().bottom +
                         this.timeDifferenceInMinute("7:00", startTime) + 19 + "px";
        div!.style.left = (document.getElementById(this.daySortedData[i][j].DAY)!.getBoundingClientRect().x 
                          - document.getElementById("mainCard")!.getBoundingClientRect().left) - 1 + "px";
      });
    }
  }

  tableDataFiller() {
    if (this.wasLoaded == false ) {
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < this.daySortedData[i].length; j++) {
          if (this.daySortedData[i].length != 0) {
            if(this.isTimeSlotAvailable(this.daySortedData[i][j].CLASS_START_TIME, this.daySortedData[i][j].CLASS_END_TIME, i)){
              var div = document.createElement("div");
              div.innerHTML = this.daySortedData[i][j].SUBJECT_NAME + ", " + this.daySortedData[i][j].CLASS_START_TIME
              + ", " + this.daySortedData[i][j].CLASS_END_TIME;
              div.title = div.innerHTML;
              div.id = "div" + i + j;
              div.style.backgroundColor = this.daySortedData[i][j].COLOR != null ? this.daySortedData[i][j].COLOR : "red";
              div.style.position = "absolute";
              div.style.overflow = "hidden";
              div.style.textOverflow = "ellipsis";
              div.onclick=() => {this.openInfoDialog(this.daySortedData[i][j])};
              div.style.border = "1px"; div.style.borderStyle = "solid";
              const startTime = this.daySortedData[i][j].CLASS_START_TIME;
              const endTime = this.daySortedData[i][j].CLASS_END_TIME;
              div.style.height = this.timeDifferenceInMinute(startTime, endTime).toString() + "px";
              div.style.fontSize = "16px";
              div.style.width = document.getElementById(this.daySortedData[i][j].DAY)?.offsetWidth.toString() + "px";
              div.style.top = (document.getElementById(this.daySortedData[i][j].DAY)!.getBoundingClientRect().bottom 
                              - document.getElementById("mainCard")!.getBoundingClientRect().top)
                              + this.timeDifferenceInMinute("7:00", startTime) - 1 + "px";
              div.style.left = (document.getElementById(this.daySortedData[i][j].DAY)!.getBoundingClientRect().x 
                              - document.getElementById("mainCard")!.getBoundingClientRect().left) - 1 + "px";
              document.getElementById("table")?.append(div);
              this.currentDivs[i].push([div.id, j.toString()]);
            }
          }
        }
      }
    this.wasLoaded = true;
    }
  }

  openInfoDialog(element) {
    this.matDialog.open(TimeTableResultDisplayDialogComponent, {data: {element: element}});
  }

  timeDifferenceInMinute(start: string, end: string){
    const startTime = start.split(':'); const endTime = end.split(':');
    return ((parseInt(endTime[0]) - parseInt(startTime[0]))*60 + parseInt(endTime[1]) - parseInt(startTime[1]));
  }

  isTimeSlotAvailable(start: string, end: string, i: number){
    const startTime: number = parseInt(start.replace(':', '')); const endTime: number = parseInt(end.replace(':', ''));
    let available: boolean = false;
    if (this.currentDivs[i].length == 0) return true;
    for(let element of this.currentDivs[i]) {
        const elementStartTime = parseInt(this.daySortedData[i][element[1]].CLASS_START_TIME.replace(':',''));
        const elementEndTime = parseInt(this.daySortedData[i][element[1]].CLASS_END_TIME.replace(':',''));
        if (startTime < elementStartTime && endTime > elementEndTime) available = false;
        else if (endTime <= elementStartTime) available = true;
        else if (startTime >= elementEndTime) available = true;
        else {
          available = false;
          break;
        }
    };
    return available;
  }

  newGeneration() {
    if (this.generationIndex == this.maxGenerationIndex) {
      this.generationIndex++;
      this.maxGenerationIndex++;
      if (this.maxGenerationIndex < 10) {
        for(let days of this.daySortedData) {
          for(let element of days) {
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
      this.saveHTMLElements();
      this.clearHTMLElements();
      this.saveDivs();
      this.currentDivs = [[],[],[],[],[],[],[]];
      this.wasLoaded = false;
      this.tableDataFiller();
      this.onResize();
    }
    else{
      this.clearHTMLElements();
      this.loadHTMLElements();
      this.loadDivs();
      this.onResize();
      this.generationIndex++;
    }
  }

  previousGeneration() {
    if (this.generationIndex > 0) {
      this.generationIndex--;
      this.clearHTMLElements();
      for(let div of this.savedHtmlElements[this.generationIndex]) {
          document.getElementById("table")?.append(div);
      }
    }
  }

  sortingByPriority() {
    for (let index = 0; index < 7; index++)
      this.daySortedData[index].sort((first,second) => second.PRIORITY - first.PRIORITY)
    for (let day = 0; day < 7; day++) {
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
    for (let index = 0; index < 7; index++)
      this.daySortedData[index].sort(() => Math.random() - 0.5)
  }

  clearHTMLElements() {
    for(let divs of this.currentDivs) {
      for(let element of divs) {
        document.getElementById(element[0])?.remove();
      }
    }
  }

  saveHTMLElements() {
    this.savedHtmlElements.push([])
    for(let divs of this.currentDivs) {
      for(let element of divs) {
        this.savedHtmlElements[this.generationIndex].push(document.getElementById(element[0])!);
      }
    }
  }

  loadHTMLElements() {
    for(let element of this.savedHtmlElements[this.generationIndex]){
      document.getElementById("table")?.append(element);
    }
  }

  saveDivs() {
    this.savedDivs.push(this.currentDivs);
  }

  loadDivs() {
    this.currentDivs = this.savedDivs[this.generationIndex];
  }
}

