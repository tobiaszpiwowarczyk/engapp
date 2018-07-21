import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderModule } from './../../components/header/header.module';
import { UnitComponent } from './components/unit/unit.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  imports: [
    HeaderModule,
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, UnitComponent]
})
export class HomeModule {}
