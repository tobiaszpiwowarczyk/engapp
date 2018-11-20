import { SidebarItemBadgeDirective } from './sidebar-item/directives/sidebar-item-badge.directive';
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
  declarations: [
    SidebarComponent,
    SidebarItemComponent,
    SidebarItemRouterExactDirective,
    SidebarItemBadgeDirective
  ],
  exports: [
    SidebarComponent,
    SidebarItemComponent,
    SidebarItemRouterExactDirective,
    SidebarItemBadgeDirective
  ]
})
export class SidebarModule { }
