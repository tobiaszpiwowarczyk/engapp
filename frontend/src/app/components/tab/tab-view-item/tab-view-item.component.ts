import { TabMenuItemComponent } from '../tab-menu-item/tab-menu-item.component';
import { Component, OnInit, Input } from '@angular/core';
import { TabService } from '../service/tab.service';

@Component({
  selector: 'app-tab-view-item',
  templateUrl: './tab-view-item.component.html',
  styleUrls: ['./tab-view-item.component.scss']
})
export class TabViewItemComponent implements OnInit {

  @Input() for: string = "";

  private tabItem: TabMenuItemComponent;

  active: boolean = false;

  constructor(
    private ts: TabService
  ) { }

  ngOnInit() {
    this.tabItem = this.ts.getActiveTabItem();
    this.active = this.tabItem.id == this.for;
    this.ts.addTabViewItem(this);
  }

}
