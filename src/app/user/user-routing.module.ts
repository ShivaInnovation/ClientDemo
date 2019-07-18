import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { UserAddComponent } from './user-add/user-add.component';

const routes: Routes = [
  {
    path: 'users',
    component: MainLayoutComponent,
    children: [
      {path: '', component:UserAddComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
