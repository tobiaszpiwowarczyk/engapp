import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UnitComponent } from './components/unit/unit.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderModule } from '../../../components/header/header.module';
import { LoaderModule } from '../../../components/loader/loader.module';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    HeaderModule,
    CommonModule,
    LoaderModule,
    HomeRoutingModule,
    HttpModule
  ],
  declarations: [HomeComponent, UnitComponent]
})
export class HomeModule {}
