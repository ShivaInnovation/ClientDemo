import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableService } from '../table.service';
import { Table } from 'src/app/Models/table';

@Component({
  selector: 'app-project-column',
  templateUrl: './project-column.component.html',
  styleUrls: ['./project-column.component.css']
})
export class ProjectColumnComponent implements OnInit {
  pageTitle = 'Project Details';  
  private sub: Subscription; 
  errorMessage: string;
  projects: any = [];  
  projectId: number;
  tables: Table [] = [];
  
  
  constructor(private projectService: ProjectService, 
              private router: Router, private route: ActivatedRoute,
              private tableService: TableService) {  

  }

  ngOnInit(): void {
    // Read the project Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProject(id);
        this.getTable(id);
        this.projectId = id;
      }
    );
    console.log(this.tables);
  }

  getProject(id: number): void {
    this.projectService.getProject(id)
      .subscribe(data => { this.projects = data;
                this.projects = Array.of(this.projects); 
              }
      );
  }

  getTable(id: number): void {
    this.tableService.getTable(id)
    .subscribe(
      tables => {
        this.tables = tables;       
      },
      error => this.errorMessage = <any>error      
    );
  }

  onAddForm(): void {
    this.router.navigate(['/tables', this.projectId]);
  } 
}
