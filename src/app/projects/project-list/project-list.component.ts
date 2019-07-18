import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Models/project';
import { ProjectService } from '../project.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  pageTitle = 'Project List';
  errorMessage = '';
  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      projects => {
        this.projects = projects;
      },
      error => this.errorMessage = <any>error      
    );
  }

  editProject(data): void {
    this.router.navigate(['/projects', data.id, 'edit']);
  }
}
