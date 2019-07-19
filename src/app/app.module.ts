import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeDirective } from 'ng2-fontawesome';
import * as jQuery from 'jquery';
import { LayoutModule } from './layout/layout.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';


const routes: Routes = [
  {
    path: '', redirectTo:'/dashboard', pathMatch:'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,    
    FontAwesomeDirective         
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes), LayoutModule,  DashboardModule, UserModule, HttpClientModule, ProjectsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
