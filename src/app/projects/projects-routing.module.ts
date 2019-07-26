import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectColumnComponent } from './project-column/project-column.component';
import { ProjectTableComponent } from './project-table/project-table.component';
import { ProjectConfigComponent } from './project-config/project-config.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectLookupTableComponent } from './project-lookup-table/project-lookup-table.component';
import { ProjectClientComponent } from './project-client/project-client.component';
import { ProjectClientConfigComponent } from './project-client-config/project-client-config.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path:'projects', 
        component:ProjectListComponent
      },
      {
        path:'projects-table', component: ProjectColumnComponent
      }, 
      {
        path:'projects-lookup-table', component: ProjectLookupTableComponent
      },
      {
        path:'project-client-config', component: ProjectClientConfigComponent
      },
      {
        path:'project-client', component: ProjectClientComponent
      },
      {
        path:'projects-table/:id', component: ProjectColumnComponent
      },  
      {
        path:'projects-detail/:id', component: ProjectDetailComponent
      },  
      {
        path:'projects/:id/edit',
        component: ProjectAddComponent
      },
      {
        path:'tables/:id',
        component: ProjectTableComponent
      },
      {
        path:'project-config', 
        component:ProjectConfigComponent
      }               
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
