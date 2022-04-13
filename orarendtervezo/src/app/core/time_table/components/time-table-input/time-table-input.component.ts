import { NumberToTextController } from '../../../../shared/controllers/numberdata-to-text-changer.controller';
import { Router } from '@angular/router';
import { EditComponent } from './crud-dialogs/edit/edit.component';
import { AddComponent } from './crud-dialogs/add/add.component';
import { DeleteComponent } from './crud-dialogs/delete/delete.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    sameSubjectGroupNames: string[] = [];
    form: FormGroup = new FormGroup({});
    displayedColumns: string[] = ['id', 'subjectGroup', 'day', 'subjectWeight', 'classStartTime', 
        'classEndTime', 'classroom',  'teacher', 'credit', 'priority', 'color', 'buttons'];
    savedElementColumns: string[] = ['saveName', 'buttons'];
    dataSource = new MatTableDataSource<TimeTableInputInterface>([]);
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
        this.sameSubjectGroupNames = JSON.parse(localStorage.getItem('SameSubjectGroups') || '[]');
        if (this.dataSource.data[this.dataSource.data.length - 1]) {
            this.ID = this.dataSource.data[this.dataSource.data.length-1].ID + 1;
        }
        this.getTimeTableSaveNameCollection();
    }

    get timeTableInputGet() {
        return this.form.controls;
    }

    openAddDialog() {
        this.matDialog.open(AddComponent, {data: {ID: this.ID}}).afterClosed()
            .subscribe(result => {
                if(result){
                    if(!this.sameSubjectGroupNames.includes(result.SUBJECT_GROUP)){
                        this.sameSubjectGroupNames.push(result.SUBJECT_GROUP);
                        localStorage.setItem('SameSubjectGroups', JSON.stringify(this.sameSubjectGroupNames)); 
                    }
                    result.SUBJECT_GROUP = this.sameSubjectGroupNames.indexOf(result.SUBJECT_GROUP);
                    this.dataSource.data.push(result);
                    this.dataSource.data = this.dataSource.data;
                    this.ID++;
                    this.localStorageSetItem();
                }
            });
    }

    openEditDialog(index: number) {
        const data = Object.assign({}, this.dataSource.data[index]);
        this.matDialog.open(EditComponent, { data: data }).afterClosed()
            .subscribe(result => {
                if (result != null) {
                    if(!this.sameSubjectGroupNames.includes(result.SUBJECT_GROUP)){
                        this.sameSubjectGroupNames.push(result.SUBJECT_GROUP);
                        localStorage.setItem('SameSubjectGroups', JSON.stringify(this.sameSubjectGroupNames)); 
                    }
                    result.SUBJECT_GROUP = this.sameSubjectGroupNames.indexOf(result.SUBJECT_GROUP);
                    this.dataSource.data[index] = result;
                    this.dataSource.data = this.dataSource.data;
                    this.localStorageSetItem();
                }
            });
    }

    openDeleteDialog(index: number) {
        this.matDialog.open(DeleteComponent).afterClosed()
            .subscribe(result => {
                if (result == 1) {
                    this.dataSource.data.splice(index, 1);
                    this.dataSource.data = this.dataSource.data;
                    this.localStorageSetItem();
                }
            });
    }

    openDeleteAllDialog() {
        this.matDialog.open(DeleteAllComponent).afterClosed().subscribe(result => {
            if (result == 1) {
                this.dataSource = new MatTableDataSource<TimeTableInputInterface>([]);
                this.ID = 1;
                this.sameSubjectGroupNames = [];
                localStorage.setItem('SameSubjectGroups', '');
                this.localStorageSetItem();
            }
        });
    }

    getSubjectGroupText(index: number) {
        return this.sameSubjectGroupNames[index];
    }

    localStorageSetItem() {
        localStorage.setItem('TimeTableInputDatas', JSON.stringify(this.dataSource.data));
    }
    
    sorting() {
        this.router.navigate(['time_table_result_display']);
    }

    addTimeTableCollection(saveName: string) {
        if(this.authService.isLoggedIn) {
            const timeTableInputdata = Object.assign({}, JSON.parse(localStorage.getItem('TimeTableInputDatas') || '[]'));
            const sameSubjectGroups = Object.assign({}, JSON.parse(localStorage.getItem('SameSubjectGroups') || '[]'));
            this.firebaseCrudsService.putUserDocument('TimeTableInputDatas', saveName, timeTableInputdata);
            this.firebaseCrudsService.putUserDocument('SameSubjectGroups', saveName, sameSubjectGroups);
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
        }
    }

    async loadTimeTableSaveNameCollection(saveName: string) {
        if(this.authService.isLoggedIn) {
            (await this.firebaseCrudsService.getUserDocument('TimeTableInputDatas')).subscribe(
                result => result.docs.map(element => {
                    if(element.id == saveName) {
                        this.dataSource.data = Object.values(element.data());
                        this.localStorageSetItem();
                    }
                }) 
            );
            (await this.firebaseCrudsService.getUserDocument('SameSubjectGroups')).subscribe(
                result => result.docs.map(element => {
                    if(element.id == saveName) {
                        this.sameSubjectGroupNames = Object.values(element.data());
                        localStorage.setItem('SameSubjectGroups', JSON.stringify(this.sameSubjectGroupNames));
                    }
                })
            );
        }     
    }
    
    deleteTimeTableSaveNameCollection(saveName: string) {
        if(this.authService.isLoggedIn) {
            this.matDialog.open(DeleteComponent).afterClosed().subscribe((result) => {
                if (result == 1) {
                    this.firebaseCrudsService.deleteUserDocument('TimeTableInputDatas', saveName)
                        .then(() => this.firebaseCrudsService.deleteUserDocument('SameSubjectGroups', saveName));
                    this.getTimeTableSaveNameCollection();
                }
            });
        }
    }
}
