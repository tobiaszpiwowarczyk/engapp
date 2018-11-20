import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextAreaModule } from '../../directives/textarea/text-area.module';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { MessageModule } from '../message/message.module';
import { ErrorReportService } from './../../services/error-report/error-report.service';
import { InputGroupModule } from './../input-group/input-group.module';
import { InputModule } from './../input/input.module';
import { LoaderModule } from './../loader/loader.module';
import { ErrorWidgetFormDirective } from './directives/error-widget-form.directive';
import { ErrorReportWidgetComponent } from './error-report-widget.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    InputGroupModule,
    InputModule,
    MessageModule,
    LoaderModule,
    TextAreaModule,
    ReactiveFormsModule
  ],
  declarations: [ErrorReportWidgetComponent, ErrorWidgetFormDirective],
  exports: [ErrorReportWidgetComponent],
  providers: [ErrorReportService]
})
export class ErrorReportWidgetModule { }
