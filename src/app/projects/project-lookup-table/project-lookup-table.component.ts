import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Models/project';
import { Table } from 'src/app/Models/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { TableService } from '../table.service';
import { TableColumn } from 'src/app/Models/tableColumn';
import { LookUpData } from 'src/app/Models/lookupData';

@Component({
  selector: 'app-project-lookup-table',
  templateUrl: './project-lookup-table.component.html',
  styleUrls: ['./project-lookup-table.component.css']
})
export class ProjectLookupTableComponent implements OnInit {
  pageTitle = "Add Lookup Data";
  lookUpForm: FormGroup; 
  SelProjectId: number;
  SelTableId;
  errorMessage: string;
  lookupTableshow: boolean = true
  private _allProjects: Project[] = [];
  private _allTable: Table[] = [];
  private lookupTables: Table[] = [];
  tableColumns: TableColumn[] =[];  
  lookupTable: LookUpData[] = []; 


  constructor(private _fb: FormBuilder,
              private router: Router,
              private projectService: ProjectService, 
              private tableService: TableService,) { }

  ngOnInit() {
    this.lookUpForm = this._fb.group({     
      projectName:[''],
      projectTableName:['']                 
      });
    this.lookupTableshow = false;
    this.getProjectDetails();
  }

  getProjectDetails() {
    this.projectService.getProjects()
    .subscribe(res => {
      this._allProjects = res;     
    });      
  }

  getTableDetails() {
    this.lookupTableshow = false;
    let id = this.lookUpForm.controls['projectName'].value 
    this.tableService.getTable(id)
    .subscribe(res => {
      this._allTable = res;     
      this.lookupTables = this._allTable.filter(function (el) {     
        return el.TableType === 'Lookup Table';                  
      });
    });
  } 

  getTableColumns() { 
    let tableId = this.lookUpForm.controls['projectTableName'].value   
      this.tableService.getTableColumn(tableId)
      .subscribe(res => {
        this.tableColumns = res; 
        this.lookupTableshow = true;    
        this.createform();                    
      });    
  }

  createform() {      
    let arr=[];  
    for(let i=0;i< this.tableColumns.length; i++) {     
      arr.push(this.BuildFormDynamic(this.tableColumns[i]))     
    }  
      let projectId = this.lookUpForm.controls['projectName'].value 
      let tableId = this.lookUpForm.controls['projectTableName'].value 
      this.lookUpForm =  this._fb.group({
        projectTableName:[tableId],  
        projectName:[projectId],       
        columnDetails:this._fb.array(arr)  
      })  
    }
    
    BuildFormDynamic(ClassDatas):FormGroup{  
      return this._fb.group({  
            columnName:[ClassDatas.CoulmnName],
            projectTableName:[ClassDatas.ProjectTableName],
            projectName:[ClassDatas.projectName],  
            ColumnData:['', [Validators.required]]         
       })  
     }

    saveTableData(): void {
    if (this.lookUpForm.valid) {
      if (this.lookUpForm.dirty) {
        const p = { ...this.lookupTable, ...this.lookUpForm.value }; 
        console.log(this.lookUpForm.value);
        this.lookUpForm.value.columnDetails.forEach(element => {
          p.projectTableName = element.projectTableName;
        }); 
          this.tableService.createLookupTable(p)
            .subscribe(
              () => {this.onSaveComplete()},
               (error: any) =>{ this.errorMessage = error.error.Message
                alert(this.errorMessage);
               }     
            );           
       } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {    
    alert('LookUp Table added successfully');
    this.router.navigate(['/projects']);
  }
}
