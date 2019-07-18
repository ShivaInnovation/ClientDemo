import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports:[MainLayoutComponent],
  declarations: [MainLayoutComponent, FooterComponent, SidebarComponent, TopNavBarComponent]
})
export class LayoutModule { }
