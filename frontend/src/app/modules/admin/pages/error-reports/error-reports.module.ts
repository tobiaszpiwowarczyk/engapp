import { IconModule } from './../../../../components/icon/icon.module';
import { ErrorReportsRoutingModule } from './error-reports-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorReportsMainComponent } from './pages/error-reports-main/error-reports-main.component';
import { ErrorReportService } from '../../../../services/error-report/error-report.service';
import { LoaderModule } from '../../../../components/loader/loader.module';
import { ButtonModule } from '../../../../components/button/button.module';
import { ErrorReportsSingleComponent } from './pages/error-reports-single/error-reports-single.component';
import { ErrorReportResolver } from './resolver/error-reports.resolver';
import { InputGroupModule } from '../../../../components/input-group/input-group.module';

@NgModule({
  imports: [
    CommonModule,
    ErrorReportsRoutingModule,
    LoaderModule,
    ButtonModule,
    InputGroupModule,
    IconModule
  ],
  declarations: [
    ErrorReportsMainComponent,
    ErrorReportsSingleComponent
  ],
  providers: [
    ErrorReportService, ErrorReportResolver
  ]
})
export class ErrorReportsModule { }
