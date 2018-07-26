import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { HeaderItemComponent } from './header-item/header-item.component';
import { MenuOpenerComponent } from './menu-opener/menu-opener.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent, HeaderItemComponent, MenuOpenerComponent]
})
export class HeaderModule { }
