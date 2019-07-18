import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { TableService } from '../table.service';
import { Project } from 'src/app/Models/project';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Config } from 'protractor';
import { Table } from 'src/app/Models/table';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-project-config',
  templateUrl: './project-config.component.html',
  styleUrls: ['./project-config.component.css']
})
export class ProjectConfigComponent implements OnInit {
  pageTitle = "Project-Configuration";
  public errorMessage: string;
  private _allProjects: Observable<Project[]>;  
  private _allTable: Observable<Table[]>; 
  private _specificTable: any[] = [];
  SelProjectId:number=0;
  SelTableId: number = 0;
  
  projects: Project[] = [];
  configs: Config[] = []; 
  tables: any[] = []; 
  public configForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private projectService: ProjectService, 
              private tableService: TableService,
              private route: ActivatedRoute) { }              

  ngOnInit() {
    this.configForm = this._fb.group({
      id: 0,
      projectName: ['', [Validators.required]],
      tableName:['',[Validators.required]],
      userRole:['', [Validators.required]]
      //userName:['', [Validators.required]]       
      });

    this.getProjectDetails();   
  }

  getProjectDetails()  
  {     
    this._allProjects =this.projectService.getProjects()    
  }

  getTableDetails()  
  {     
    this._allTable =this.tableService.getTable(this.SelProjectId);
  } 
  
  getSpecificTable() {
    this.tableService.getTableById(2)
    .subscribe(data => { this._specificTable = data;
      this._specificTable = Array.of(this._specificTable);
    });
    console.log(this._specificTable);
  }
  
}
