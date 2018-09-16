import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderItemComponent } from './header-item/header-item.component';
import { HeaderComponent } from './header.component';
import { MenuOpenerComponent } from './menu-opener/menu-opener.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { HeaderService } from './services/header.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    HeaderItemComponent,
    MenuOpenerComponent,
    HeaderMenuComponent
  ],
  declarations: [
    HeaderComponent,
    HeaderItemComponent,
    MenuOpenerComponent,
    HeaderMenuComponent
  ],
  providers: [HeaderService]
})
export class HeaderModule { }
