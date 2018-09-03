import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderItemComponent } from './header-item/header-item.component';
import { HeaderComponent } from './header.component';
import { MenuOpenerComponent } from './menu-opener/menu-opener.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    HeaderItemComponent,
    MenuOpenerComponent
  ],
  declarations: [
    HeaderComponent,
    HeaderItemComponent,
    MenuOpenerComponent
  ]
})
export class HeaderModule { }
