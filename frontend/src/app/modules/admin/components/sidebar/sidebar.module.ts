import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { RouterModule } from '@angular/router';
import { SidebarItemRouterExactDirective } from './sidebar-item/directives/sidebar-item.router-exact.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [SidebarComponent, SidebarItemComponent, SidebarItemRouterExactDirective],
  exports: [SidebarComponent, SidebarItemComponent, SidebarItemRouterExactDirective]
})
export class SidebarModule { }
