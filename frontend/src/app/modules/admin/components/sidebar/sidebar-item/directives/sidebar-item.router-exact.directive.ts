import { Directive } from '@angular/core';
import { SidebarItemComponent } from '../sidebar-item.component';

@Directive({ selector: 'app-sidebar-item[routerExact]' })
export class SidebarItemRouterExactDirective {
  constructor(
    private component: SidebarItemComponent
  ) {
    this.component.routerExact = true;
  }
}