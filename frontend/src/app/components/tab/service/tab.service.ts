import { Injectable } from '@angular/core';
import { TabMenuItemComponent } from '../tab-menu-item/tab-menu-item.component';
import { TabViewItemComponent } from './../tab-view-item/tab-view-item.component';

@Injectable()
export class TabService {

  private activeTabItem: TabMenuItemComponent;
  private activeTabViewItem: TabViewItemComponent;
  private tabViews: TabViewItemComponent[] = [];



  constructor() {}



  public getActiveTabItem(): TabMenuItemComponent {
    return this.activeTabItem;
  }

  public setActiveTabItem(tabItem: TabMenuItemComponent): void {
    this.activeTabItem = tabItem;
    if(this.tabViews.length > 0) {
      this.tabViews.forEach(tab => tab.active = false);
      this.activeTabViewItem = this.tabViews.filter(x => x.for == tabItem.id)[0];
      this.activeTabViewItem.active = true;
    }
    this.activeTabItem.active = true;
  }

  public deactivateTabItem(tabItem: TabMenuItemComponent): void {
    tabItem.active = false;
  }

  public addTabViewItem(tabView: TabViewItemComponent): void {
    this.tabViews.push(tabView);
    if(tabView.active)
      this.activeTabViewItem = tabView;
  }

  public clearTabView(): void {
    this.tabViews = [];
  }
}