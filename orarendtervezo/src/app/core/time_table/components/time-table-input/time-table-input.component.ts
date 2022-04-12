import { NumberToTextController } from '../../../../shared/controllers/numberdata-to-text-changer.controller';
import { Router } from '@angular/router';
import { EditComponent } from './crud-dialogs/edit/edit.component';
import { AddComponent } from './crud-dialogs/add/add.component';
import { DeleteComponent } from './crud-dialogs/delete/delete.component';
import { Component, OnInit, ViewChildren} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteAllComponent } from 'src/app/core/time_table/components/time-table-input/crud-dialogs/delete-all/delete-all.component';
import { TimeTableInputInterface } from '../../interfaces/time-table-input.interface';
import { FirebaseCrudsService } from '../../services/firebase-cruds.service';


@Component({
    selector: 'app-time-table-input',
    templateUrl: './time-table-input.component.html',
    styleUrls: ['./time-table-input.component.css']
})
export class TimeTableInputComponent implements OnInit{

    ID = 1;
    index = 0;
    saveName = '';
    form: FormGroup = new FormGroup({});
    displayedColumns: string[] = ['id', 'subjectName', 'day', 'subjectWeight', 'classStartTime', 
        'classEndTime', 'classroom',  'teacher', 'credit', 'priority', 'color', 'buttons'];
    savedElementColumns: string[] = ['saveName', 'buttons'];
    dataSource = new MatTableDataSource<TimeTableInputInterface>([]);
    daySortedData: TimeTableInputInterface[][] = [[],[],[],[],[],[]];
    databaseSource = new MatTableDataSource<string>([]);

    constructor (
    public authService: AuthService,
    public matDialog: MatDialog,
    public router: Router,
    public numberToTextController: NumberToTextController,
    private firebaseCrudsService: FirebaseCrudsService,
    ) {}

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<TimeTableInputInterface>([]);
        this.dataSource.data = JSON.parse(localStorage.getItem('TimeTableInputDatas') || '[]');
        this.daySortedData = JSON.parse(localStorage.getItem('TimeTableDaySortedData') || '[[],[],[],[],[],[]]');
        if (this.dataSource.data[this.dataSource.data.length - 1]) {
            this.ID = this.dataSource.data[this.dataSource.data.length-1].ID + 1;
        }
        this.getTimeTableSaveNameCollection();
    }

    get timeTableInputGet() {
        return this.form.controls;
    }

    sorting() {
        for (let day = 0; day < 6; day++) {
            this.daySortedData[day].sort((first,second) => second.PRIORITY - first.PRIORITY);
            this.daySortedData[day].sort((first,second) => {
                if(first.PRIORITY == second.PRIORITY) {
                    return parseInt(second.SUBJECT_WEIGHT) - parseInt(first.SUBJECT_WEIGHT);
                } 
                else return parseInt(first.SUBJECT_WEIGHT);
            });
        }
        localStorage.setItem('TimeTableDaySortedData', JSON.stringify(this.daySortedData));
        this.router.navigate(['time_table_result_display']);
    }

    openAddDialog() {
        this.matDialog.open(AddComponent, {data: {ID: this.ID}}).afterClosed()
            .subscribe(result => {
                if(result){
                    this.dataSource.data.push(result);
                    this.dataSource.data = this.dataSource.data;
                    this.daySortedData[this.dataSource.data[this.dataSource.data.length-1].DAY].push(result);
                    this.localStorageSetItem();
                    this.ID++;
                }
            });
    }

    openEditDialog(index: number) {
        const changeElementInIndex = this.daySortedData[this.dataSource.data[index].DAY]
            .findIndex(element => element.ID == this.dataSource.data[index].ID);
        const changeElementOutIndex = parseInt(this.dataSource.data[index].DAY);
        const data = Object.assign({}, this.dataSource.data[index]);
        this.matDialog.open(EditComponent, { data: data }).afterClosed()
            .subscribe(result => {
                if (result != null) {
                    this.daySortedData[changeElementOutIndex].splice(changeElementInIndex,1);
                    this.dataSource.data[index] = result;
                    this.dataSource.data = this.dataSource.data;
                    this.daySortedData[this.dataSource.data[index].DAY].push(result);
                    this.localStorageSetItem();
                }
            });
    }

    openDeleteDialog(index: number) {
        const changeElementInIndex = this.daySortedData[this.dataSource.data[index].DAY]
            .findIndex(element => element.ID == this.dataSource.data[index].ID);
        const changeElementOutIndex = parseInt(this.dataSource.data[index].DAY);
        this.matDialog.open(DeleteComponent).afterClosed()
            .subscribe(result => {
                if (result == 1) {
                    this.daySortedData[changeElementOutIndex].splice(changeElementInIndex,1);
                    this.dataSource.data.splice(index, 1);
                    //tesztelni törléshez
                    this.dataSource.data = this.dataSource.data;
                    this.localStorageSetItem();
                }
            });
    }

    openDeleteAllDialog() {
        this.matDialog.open(DeleteAllComponent).afterClosed().subscribe(result => {
            if (result == 1) {
                this.dataSource = new MatTableDataSource<TimeTableInputInterface>([]);
                this.daySortedData = [[],[],[],[],[],[]];
                this.ID = 1;
                this.localStorageSetItem();
            }
        });
    }

    localStorageSetItem() {
        localStorage.setItem('TimeTableInputDatas', JSON.stringify(this.dataSource.data));
        localStorage.setItem('TimeTableDaySortedData', JSON.stringify(this.daySortedData));
    }

    addTimeTableCollection(saveName: string) {
        if(this.authService.isLoggedIn) {
            const data = Object.assign({}, JSON.parse(localStorage.getItem('TimeTableInputDatas') || '[]'));
            this.databaseSource.data.find(e => e == saveName) 
                ? this.firebaseCrudsService.updateUserDocument('TimeTableInputDatas', saveName, data)
                : this.firebaseCrudsService.putUserDocument('TimeTableInputDatas', saveName, data);
            this.getTimeTableSaveNameCollection();
            this.saveName = '';
        }
    }

    async getTimeTableSaveNameCollection() {
        if(this.authService.isLoggedIn) {
            (await this.firebaseCrudsService.getUserDocument('TimeTableInputDatas')).subscribe(
                result => this.databaseSource.data = result.docs.map(element => {
                    return element.id;
                }) 
            );
            this.databaseSource.data = this.databaseSource.data;
        }
    }

    async loadTimeTableSaveNameCollection(saveName: string) {
        if(this.authService.isLoggedIn) {
            (await this.firebaseCrudsService.getUserDocument('TimeTableInputDatas')).subscribe(
                result => result.docs.map(element => {
                    if(element.id == saveName) {
                        this.daySortedData = [[],[],[],[],[],[]];
                        this.dataSource.data = Object.values(element.data());
                        this.dataSource.data.forEach(element => {
                            this.daySortedData[parseInt(element.DAY)].push(element);
                        });
                        this.localStorageSetItem();
                    }
                }) 
            );       
        }     
    }
    
    deleteTimeTableSaveNameCollection(saveName: string) {
        if(this.authService.isLoggedIn) {
            const index = this.databaseSource.data.indexOf(saveName);
            this.matDialog.open(DeleteComponent).afterClosed().subscribe((result) => {
                if (result == 1) {
                    this.firebaseCrudsService.deleteUserDocument('TimeTableInputDatas', saveName)
                        .then(() => this.databaseSource.data[index].slice());
                    this.databaseSource.data = this.databaseSource.data;
                }
            });
        }
    }
}
