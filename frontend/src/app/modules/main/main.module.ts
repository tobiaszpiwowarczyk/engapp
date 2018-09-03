import { NgModule } from '@angular/core';
import { HeaderModule } from '../../components/header/header.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [MainRoutingModule, HeaderModule, CommonModule],
  declarations: [MainComponent]
})
export class MainModule { }
