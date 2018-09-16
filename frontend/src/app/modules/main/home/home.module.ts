import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ButtonModule } from '../../../components/button/button.module';
import { HeaderModule } from '../../../components/header/header.module';
import { LoaderModule } from '../../../components/loader/loader.module';
import { UnitComponent } from './components/unit/unit.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { UnitPublishedModule } from '../../../pipes/unit-filter/unit-filter.module';

@NgModule({
  imports: [
    HeaderModule,
    CommonModule,
    LoaderModule,
    ButtonModule,
    UnitPublishedModule,
    HomeRoutingModule,
    HttpModule
  ],
  declarations: [HomeComponent, UnitComponent]
})
export class HomeModule {}
