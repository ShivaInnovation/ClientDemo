import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { TableService } from '../table.service';
import { Project } from 'src/app/Models/project';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'protractor';
import { Table } from 'src/app/Models/table';
import { filter, map, tap } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';

@Component({
  selector: 'app-project-config',
  templateUrl: './project-config.component.html',
  styleUrls: ['./project-config.component.css']
})
export class ProjectConfigComponent implements OnInit {
  pageTitle = "Project-Configuration";
  public errorMessage: string;  
  config: Config;
  private _allProjects: Project[];
  private _allTable: Table[];
  private filterData: any[] = [];
  tableColumns: any[] = [];
  filteredUsers: any[] = [];
  userRoles: any = [{'id': 1, 'name': 'Admin'}, {'id': 2, 'name': 'Creator'}, {'id': 3, 'name': 'Super'}]
  users: any =[{'id': 1, 'itemName': 'Madan', 'roleId': 1}, {'id': 2, 'itemName': 'Chaithanya', 'roleId': 2}, {'id': 3, 'itemName': 'Shiva', 'roleId': 2},{'id': 4, 'itemName': 'Monus', 'roleId': 2} ]
  SelProjectId:number=0;
  SelTableName: string;
  SelUserRole: number = 0;
  checkedInfo: any;
  public checkBoxArray = [];
  
  projects: Project[] = [];
  configs: Config[] = []; 
  tables: any[] = []; 
  public configForm: FormGroup; 

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private _fb: FormBuilder,
              private router: Router,
              private projectService: ProjectService, 
              private tableService: TableService,
              private route: ActivatedRoute) { }              

  ngOnInit() {
    this.configForm = this._fb.group({
      id: 0,
      //projects:[[],[Validators.required]],    
      users:[[],[Validators.required]]           
      });

    this.getProjectDetails();
    this.dropdownList = this.users; 
    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Select Users",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
      //showCheckbox: true
    };       
  }

  onItemSelect(item:any){
    console.log(item);
    //this.selectedItems.push(item);
    }
  OnItemDeSelect(item:any){
    console.log(item);
    //this.selectedItems.push(item);
  }   
  onSelectAll(items: any){
    //this.selectedItems.push(items);
  }
  onDeSelectAll(items: any){
    //this.selectedItems.push(items);
  }

  getProjectDetails()  
  {     
    this.projectService.getProjectsData().subscribe(res => this._allProjects = res as Project[]);  
  }

  // getTableDetails()  
  // { 
  //   this.tableService.getTableDataId(this.SelProjectId).subscribe(res => this._allTable = res as Table[]);  
  // } 
  
  // getSpecificTable() {       
  //   this.filterData = this._allTable.filter(t => t.name == this.SelTableName);
  //   this.tableColumns = this.filterData.map(function(i) {
  //     return i.columnNames.split(',') 
  //   }); 
  // }
  
  // getSpecificUsers() {
  //   this.selectedItems = [];
  //   this.filteredUsers = this.users.filter(t => t.roleId == this.SelUserRole);
  //   this.dropdownList = this.filteredUsers;  
  // }
  onChangeColumn(val, isChecked){
    this.checkedInfo = isChecked; 
    if(isChecked.target.checked) {
      this.checkBoxArray.push(val );
    } else {
      let index = this.checkBoxArray.indexOf(val);
      this.checkBoxArray.splice(index, 1);
    }    
    console.log(this.checkBoxArray);
  }
  
  saveProjectConfig(): void {
    console.log(this.selectedItems);
    if (this.configForm.valid) {
      if (this.configForm.dirty) {
        const p = { ...this.config, ...this.configForm.value };        
          p.projects = this.checkBoxArray;
          p.users = this.selectedItems; 
          p.users = this.selectedItems.map(function(i) {
                return i.itemName 
              });   
          console.log(p);
          this.projectService.createProjectConfig(p)
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
    this.router.navigate(['/projects-table']);
  } 
  
}
