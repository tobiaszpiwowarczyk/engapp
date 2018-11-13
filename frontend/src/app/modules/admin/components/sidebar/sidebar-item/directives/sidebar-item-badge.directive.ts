import { Directive, DoCheck, Input } from '@angular/core';
import { SidebarItemComponent } from '../sidebar-item.component';


export interface Badge {
  visible: boolean;
  value: number;
}


@Directive({ selector: 'app-sidebar-item[badge]' })
export class SidebarItemBadgeDirective implements DoCheck {

  @Input() badgeValue: number = 0;

  constructor(private c: SidebarItemComponent) { }

  ngDoCheck() {
    this.c.badge = { visible: this.badgeValue > 0, value: this.badgeValue };
  }
}