import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../../../../components/button/button.module';
import { InputGroupModule } from '../../../../components/input-group/input-group.module';
import { LoaderModule } from '../../../../components/loader/loader.module';
import { IconModule } from './../../../../components/icon/icon.module';
import { ErrorReportsRoutingModule } from './error-reports-routing.module';
import { ErrorReportsMainComponent } from './pages/error-reports-main/error-reports-main.component';
import { ErrorReportsSingleComponent } from './pages/error-reports-single/error-reports-single.component';
import { ErrorReportResolver } from './resolver/error-reports.resolver';
import { TableSortableFilterModule } from '../../../../components/table-sortable-filter/table-sortable-filter.module';

@NgModule({
  imports: [
    CommonModule,
    ErrorReportsRoutingModule,
    LoaderModule,
    ButtonModule,
    InputGroupModule,
    IconModule,
    TableSortableFilterModule
  ],
  declarations: [
    ErrorReportsMainComponent,
    ErrorReportsSingleComponent
  ],
  providers: [
    ErrorReportResolver
  ]
})
export class ErrorReportsModule { }
