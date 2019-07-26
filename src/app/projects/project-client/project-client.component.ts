import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { TableService } from '../table.service';
import { TableColumn } from 'src/app/Models/tableColumn';

@Component({
  selector: 'app-project-client',
  templateUrl: './project-client.component.html',
  styleUrls: ['./project-client.component.css']
})
export class ProjectClientComponent implements OnInit {
  pageTitle = "Client Data";
  clientForm: FormGroup; 
  //clientData: ClientData[] =[];
  tableColumns: TableColumn[] =[]; 

  constructor(private _fb: FormBuilder,
    private router: Router,
    private tableService: TableService) { }

    ngOnInit() {
      this.tableService.getTableColumn('1')
      .subscribe(res => {
        this.tableColumns = res;
        console.log(this.tableColumns); 
        this.createform();                    
      });    
    }

    createform() {     
      let arr=[];  
      for(let i=0;i< this.tableColumns.length; i++) {     
        arr.push(this.BuildFormDynamic(this.tableColumns[i]))     
      }  
        this.clientForm =  this._fb.group({
          projectTableName:[],         
          clientColumn:this._fb.array(arr)  
        })  
      } 
  
      BuildFormDynamic(ClassDatas):FormGroup{  
        return this._fb.group({  
              columnName:[ClassDatas.CoulmnName],
              projectTableName:[ClassDatas.ProjectTableName],  
              ColumnData:['', [Validators.required]]         
         })  
       }

}
