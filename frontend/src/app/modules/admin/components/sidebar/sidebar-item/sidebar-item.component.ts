import { Component, Input, OnInit } from '@angular/core';
import { Badge } from './directives/sidebar-item-badge.directive';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./scss/sidebar-item.component.scss']
})
export class SidebarItemComponent implements OnInit {

  @Input() text: string = "";
  @Input() icon: string = "";
  @Input() href: any[] = [];

  routerExact: boolean = false;
  badge: Badge;

  constructor() { }
  ngOnInit() { }

}
