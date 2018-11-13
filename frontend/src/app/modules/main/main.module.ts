import { UnitScopeService } from './services/unit-scope.service';
import { NgModule } from '@angular/core';
import { HeaderModule } from '../../components/header/header.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { LoaderModule } from '../../components/loader/loader.module';
import { ErrorReportWidgetModule } from '../../components/error-report-widget/error-report-widget.module';


@NgModule({
  imports: [
    MainRoutingModule,
    HeaderModule,
    CommonModule,
    LoaderModule,
    ErrorReportWidgetModule
  ],
  declarations: [MainComponent],
  providers: [UnitScopeService]
})
export class MainModule { }
