import { Component, OnInit } from '@angular/core';
import { TimeTableInputInterface } from '../time-table-input/time-table-input.component';

@Component({
  selector: 'app-time-table-result-display',
  templateUrl: './time-table-result-display.component.html',
  styleUrls: ['./time-table-result-display.component.css']
})

export class TimeTableResultDisplayComponent implements OnInit {

  hours: string[] = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  daySortedData: TimeTableInputInterface[][] = [[],[],[],[],[],[],[]];

  constructor() { 
    this.daySortedData = JSON.parse(localStorage.getItem('TimeTableDaySortedData') || '[[],[],[],[],[],[],[]]');
  }

  ngOnInit(): void {
    this.daySortedData = JSON.parse(localStorage.getItem('TimeTableDaySortedData') || '[[],[],[],[],[],[],[]]');
  }

  wasLoaded = false;
  createdDivs: string[][] = [];

  onResize() {
    this.createdDivs.forEach(element => {
      var div = document.getElementById(element[0]);
      var i = parseInt(element[1]);
      var j = parseInt(element[2]);
      const startTime = this.daySortedData[i][j].CLASS_START_TIME.replace(':', '');
      const endTime = this.daySortedData[i][j].CLASS_END_TIME.replace(':', '');
      div!.style.width = document.getElementById(this.daySortedData[i][j].DAY)?.offsetWidth.toString() + "px";
      div!.style.height = this.timeDifferenceInMinute(startTime, endTime).toString() + "px";
      div!.style.top = document.getElementById(this.daySortedData[i][j].DAY)!.getBoundingClientRect().bottom +
                       this.timeDifferenceInMinute("7:00", startTime) + "px";
      div!.style.left = (document.getElementById(this.daySortedData[i][j].DAY)!.getBoundingClientRect().x 
                        - document.getElementById("mainCard")!.getBoundingClientRect().left) + "px";
      div!.style.fontSize = "16px";
    }); 
  }

  //TODO: ha nem mindegyik lesz hozzáadva, akkor a pusholásnál figyelni kell az i,j változókra 
  tableDataFiller() {
    if (this.wasLoaded == false ) {
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < this.daySortedData[i].length; j++) {
          if (this.daySortedData[i].length != 0) {
            var div = document.createElement("div");
            div.innerHTML = this.daySortedData[i][j].SUBJECT_NAME + ", " + this.daySortedData[i][j].CLASS_START_TIME
            + ", " + this.daySortedData[i][j].CLASS_END_TIME;
            div.title = div.innerHTML;
            div.id = "div" + i + j;
            div.style.backgroundColor = "red";
            div.style.position = "absolute";
            div.style.overflow = "hidden";
            div.style.textOverflow = "ellipsis";
            const startTime = this.daySortedData[i][j].CLASS_START_TIME
            const endTime = this.daySortedData[i][j].CLASS_END_TIME;
            div.style.width = document.getElementById(this.daySortedData[i][j].DAY)?.offsetWidth.toString() + "px";
            div.style.height = this.timeDifferenceInMinute(startTime, endTime).toString() + "px";
            div.style.top = (document.getElementById(this.daySortedData[i][j].DAY)!.getBoundingClientRect().bottom 
                            - document.getElementById("mainCard")!.getBoundingClientRect().top + 19)
                            + this.timeDifferenceInMinute("7:00", startTime) + "px";
                            console.log(this.timeDifferenceInMinute(startTime, endTime));
            div.style.left = (document.getElementById(this.daySortedData[i][j].DAY)!.getBoundingClientRect().x 
                            - document.getElementById("mainCard")!.getBoundingClientRect().left) + "px";
            div.style.fontSize = "16px";
            document.getElementById("table")?.append(div);
            this.createdDivs.push([div.id, i.toString(), j.toString()]);
          }
        }
      }
    this.wasLoaded = true;
    }
  }

  timeDifferenceInMinute(start: string, end: string){
    const startTime = start.split(':'); const endTime = end.split(':');
    return ((parseInt(endTime[0]) - parseInt(startTime[0]))*60 + parseInt(endTime[1]) - parseInt(startTime[1]));
  }
}
