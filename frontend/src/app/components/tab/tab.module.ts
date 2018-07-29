import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabMenuItemDirective } from './directives/tab-item-active.directive';
import { TabService } from './service/tab.service';
import { TabMenuItemComponent } from './tab-menu-item/tab-menu-item.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { TabViewItemComponent } from './tab-view-item/tab-view-item.component';
import { TabViewComponent } from './tab-view/tab-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    TabMenuComponent,
    TabMenuItemComponent,
    TabViewComponent,
    TabViewItemComponent,
    TabMenuItemDirective
  ],
  declarations: [
    TabMenuComponent,
    TabMenuItemComponent,
    TabViewComponent,
    TabViewItemComponent,
    TabMenuItemDirective
  ],
  providers: [TabService]
})
export class TabModule {}