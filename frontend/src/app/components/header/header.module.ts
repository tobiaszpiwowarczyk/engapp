import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
