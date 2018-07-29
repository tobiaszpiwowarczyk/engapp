import { Component, Input, OnInit } from '@angular/core';
import { TabService } from '../service/tab.service';

@Component({
  selector: 'app-tab-menu-item',
  templateUrl: './tab-menu-item.component.html',
  styleUrls: ['./tab-menu-item.component.scss']
})
export class TabMenuItemComponent implements OnInit {

  @Input() id: string = "";
  @Input() text: string = "";
  @Input() active: boolean = false;

  tabMenuId: string;

  constructor(
    private ts: TabService
  ) {}
  ngOnInit() {
    if(this.active) {
      this.ts.setActiveTabItem(this);
    }
  }

  public activate(): void {
    this.ts.deactivateTabItem(this.ts.getActiveTabItem());
    this.ts.setActiveTabItem(this);
  }

}
