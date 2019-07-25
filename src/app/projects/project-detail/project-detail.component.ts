import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableService } from '../table.service';
import { ProjectService } from '../project.service';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LookUpData } from 'src/app/Models/lookupData';
import { TableColumn } from 'src/app/Models/tableColumn';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  pageTitle = "Table Details"
  private sub: Subscription; 
  errorMessage: string;
  tableId: string;
  columnForm: FormGroup;
  projectId: number;
  tableColumns: TableColumn[] =[];  
  lookupTable: LookUpData[] = []; 
  lookupTableshow: boolean = true

  constructor( private _fb: FormBuilder, 
               private router: Router,
               private route: ActivatedRoute,
               private tableService: TableService) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id'); 
        this.tableId = id.toString();       
      }
    ); 
    this.lookupTableshow = false;
   
    this.tableService.getTableColumn(this.tableId)
    .subscribe(res => {
      this.tableColumns = res;
      this.tableColumns.forEach(e=> {
        if(e.TableType.toUpperCase() == 'Lookup Table'.toUpperCase())
          this.lookupTableshow = true;         
      });     
      this.createform();                    
    });    
  }

  createform() { 
    console.log(this.tableColumns); 
    let arr=[];  
    for(let i=0;i< this.tableColumns.length; i++) {     
      arr.push(this.BuildFormDynamic(this.tableColumns[i]))     
    }  
      this.columnForm =  this._fb.group({
        projectTableName:[],         
        columnDetails:this._fb.array(arr)  
      })  
    } 

    BuildFormDynamic(ClassDatas):FormGroup{  
      return this._fb.group({  
            columnName:[ClassDatas.CoulmnName],
            projectTableName:[ClassDatas.ProjectTableName],  
            ColumnData:['', [Validators.required]]         
       })  
     }

  saveTableData(): void {
    if (this.columnForm.valid) {
      if (this.columnForm.dirty) {
        const p = { ...this.lookupTable, ...this.columnForm.value }; 
        console.log(this.columnForm.value);
        this.columnForm.value.columnDetails.forEach(element => {
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
    this.router.navigate(['/projects-table', this.tableId]);
  }

  
  onBack(): void {
    this.router.navigate(['/projects-table', this.tableId]);
  }
}
