import { Component, OnInit } from '@angular/core';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./scss/sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  expanded: boolean = false;

  constructor(private sidebar: SidebarService) { }

  ngOnInit() {
    this.sidebar.expanded.subscribe(e => this.expanded = e);
  }

}
