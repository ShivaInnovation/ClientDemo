import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectColumnComponent } from './project-column/project-column.component';
import { ProjectTableComponent } from './project-table/project-table.component';
import { ProjectConfigComponent } from './project-config/project-config.component';
@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule    
  ],
  declarations: [ProjectAddComponent, ProjectListComponent, ProjectColumnComponent, ProjectTableComponent, ProjectConfigComponent]
})
export class ProjectsModule { }
