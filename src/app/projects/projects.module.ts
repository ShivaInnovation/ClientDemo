import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectColumnComponent } from './project-column/project-column.component';
import { ProjectTableComponent } from './project-table/project-table.component';
import { ProjectConfigComponent } from './project-config/project-config.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ErrorInterceptorProvider } from '../error.interceptor';
import { ProjectLookupTableComponent } from './project-lookup-table/project-lookup-table.component';
import { ProjectClientComponent } from './project-client/project-client.component';
import { ProjectClientConfigComponent } from './project-client-config/project-client-config.component';
@NgModule({
  imports: [
    CommonModule,
    AngularMultiSelectModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    FormsModule   
  ],
  declarations: [ProjectAddComponent, 
                  ProjectListComponent, 
                  ProjectColumnComponent, 
                  ProjectTableComponent, 
                  ProjectConfigComponent, 
                  ProjectDetailComponent, 
                  ProjectLookupTableComponent, ProjectClientComponent, ProjectClientConfigComponent],
  providers:[]
})
export class ProjectsModule { }
