import { TimeTableResultDisplayDialogComponent } from './../time-table-result-display-dialog/time-table-result-display-dialog.component';
import { AfterViewInit, Component, OnInit } from '@angular/core';
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

  constructor(public matDialog: MatDialog) { 
    this.daySortedData = JSON.parse(localStorage.getItem('TimeTableDaySortedData') || '[[],[],[],[],[],[],[]]');
  }

  ngOnInit(): void {
    this.daySortedData = JSON.parse(localStorage.getItem('TimeTableDaySortedData') || '[[],[],[],[],[],[],[]]');
  }

  wasLoaded = false;
  createdDivs: string[][][] = [[],[],[],[],[],[],[]];

  onResize() {
    for (let index = 0; index < this.createdDivs.length - 1; index++) {
      this.createdDivs[index].forEach(element => {
        var div = document.getElementById(element[0]);
        var i = index;
        var j = parseInt(element[1]);
        const startTime = this.daySortedData[i][j].CLASS_START_TIME.replace(':', '');
        div!.style.width = document.getElementById(this.daySortedData[i][j].DAY)?.offsetWidth.toString() + "px";
        div!.style.top = document.getElementById(this.daySortedData[i][j].DAY)!.getBoundingClientRect().bottom +
                        this.timeDifferenceInMinute("7:00", startTime) + "px";
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
                              - document.getElementById("mainCard")!.getBoundingClientRect().top + 19)
                              + this.timeDifferenceInMinute("7:00", startTime) + "px";
              div.style.left = (document.getElementById(this.daySortedData[i][j].DAY)!.getBoundingClientRect().x 
                              - document.getElementById("mainCard")!.getBoundingClientRect().left) - 1 + "px";
              document.getElementById("table")?.append(div);
              this.createdDivs[i].push([div.id, j.toString()]);
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
    if (this.createdDivs[i].length == 0) return true;
    for(let element of this.createdDivs[i]) {
        const elementStartTime = parseInt(this.daySortedData[i][element[1]].CLASS_START_TIME.replace(':',''));
        const elementEndTime = parseInt(this.daySortedData[i][element[1]].CLASS_END_TIME.replace(':',''));
        console.log(startTime, elementStartTime, endTime, elementEndTime);
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
}

