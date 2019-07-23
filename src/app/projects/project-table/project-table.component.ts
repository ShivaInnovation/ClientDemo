import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Table } from 'src/app/Models/table';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from '../table.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {
  pageTitle ="Add Table";
  table: Table;
  TableType: any = [{'id': 1, 'name': 'Main Table'}, {'id': 2, 'name': 'Lookup Table'}]
  tables: Table[] = [];
  projectId: number;
  public tableForm: FormGroup;
  public errorMessage: string;
  private sub: Subscription; 
  get columns(): FormArray {
    return <FormArray>this.tableForm.get('columns');
  }

  constructor(private _fb: FormBuilder, 
              private router: Router,
              private route: ActivatedRoute,
              private tableService: TableService) { }

  ngOnInit() {
    this.tableForm = this._fb.group({
      id: 0,
      name: ['', [Validators.required, Validators.minLength(4)]],     
      tableType: [this.TableType,[Validators.required]],     
      columns: this._fb.array([], [Validators.required]),
  });

  this.sub = this.route.paramMap.subscribe(
    params => {
      const id = +params.get('id'); 
      this.projectId = id;       
    }
  );
  }

  createItem() {
    return this._fb.group({
      columnName: ['Jon']      
    })
  }

  changeTable(e) {
    this.tableName.setValue(e.target.value, {
      onlySelf: true
    })
  }  
  
  
  get tableName() {
    return this.tableForm.get('tableType');
  }

  addColumn(): void {   
    let cols =  this.tableForm.get('columns') as FormArray; 
    this.columns.push(this._fb.group({
      columnName: '',
      dataType: 'varchar(500)',
    }));
  }
  
  deleteColumn(index: number): void {
    const columns = this.tableForm.controls.columns as FormArray;
    columns.removeAt(index);
    columns.markAsDirty();
  }

  saveTable(): void {
    if (this.tableForm.valid) {
      if (this.tableForm.dirty) {
        const p = { ...this.table, ...this.tableForm.value }; 
        p.projectId = this.projectId;
        console.log(p);       
          this.tableService.createTable(p)
            .subscribe(
              () => this.onSaveComplete(),
               error => this.errorMessage = error              
            );           
       } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
  
  onSaveComplete(): void {
    // Reset the form to clear the flags
    //this.productForm.reset();
    alert('Table added successfully');
    this.router.navigate(['/projects-table', this.projectId]);
  }  

  cancel(): void {
    this.router.navigate(['/projects-table', this.projectId]);
  }

}
