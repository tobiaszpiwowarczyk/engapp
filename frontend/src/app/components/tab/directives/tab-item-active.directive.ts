import { TabMenuItemComponent } from './../tab-menu-item/tab-menu-item.component';
import { Directive } from '@angular/core';

@Directive({ selector: '[appMenuActive]' })
export class TabMenuItemDirective {
  constructor(
    private tabMenuItem: TabMenuItemComponent
  ) {
    this.tabMenuItem.active = true;
  }
}