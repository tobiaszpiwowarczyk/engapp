import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { itemAnimation } from '../../animations/animations';
import { MessageContainerComponent } from '../message/message-container/message-container.component';
import { ErrorReportService } from './../../services/error-report/error-report.service';

@Component({
  selector: 'app-error-report-widget',
  templateUrl: './error-report-widget.component.html',
  styleUrls: ['./error-report-widget.component.scss'],
  animations: [itemAnimation]
})
export class ErrorReportWidgetComponent implements OnInit {

  loaderShown: boolean = false;
  widgetShown: boolean = false;

  errorReportForm: FormGroup;
  errorMessage: FormControl = new FormControl('', Validators.required);
  errorReportSubmitButtonDisabled: boolean = false;

  @ViewChild("msg") msg: MessageContainerComponent;



  constructor(
    private fb: FormBuilder,
    private errs: ErrorReportService
  ) { }

  ngOnInit() {
    this.errorReportForm = this.fb.group({
      subject: ['', Validators.required],
      message: this.errorMessage
    });

    this.errorReportSubmitButtonDisabled = this.errorReportForm.invalid;
    this.errorReportForm.valueChanges.subscribe(() => {
      this.errorReportSubmitButtonDisabled = this.errorReportForm.invalid;
    });
  }





  public showWidget(): void {
    this.widgetShown = true;
  }



  public hideWidget(): void {
    this.errorReportForm.reset();
    this.widgetShown = false;
  }



  public submitReport(): void {
    if(this.errorReportForm.valid) {
      this.loaderShown = true;
      this.errs.addErrorReport(this.errorReportForm.value)
        .subscribe(res => {
          this.hideWidget();
          this.msg.show(res.state);
        }, null, () => this.loaderShown = false);
    }
  }
}