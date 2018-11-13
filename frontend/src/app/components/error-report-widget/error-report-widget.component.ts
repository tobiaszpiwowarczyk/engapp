import { ErrorReportService } from './../../services/error-report/error-report.service';
import { animate, style, transition, trigger } from "@angular/animations";
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BEZIER, MESSAGE_ANIMATION_TIME, MESSAGE_HIDDEN, MESSAGE_SHOWN } from './../message/util/message-animations';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-error-report-widget',
  templateUrl: './error-report-widget.component.html',
  styleUrls: ['./error-report-widget.component.scss'],
  animations: [
    trigger("messageAnimation", [
      transition(":enter", [
        style({
          opacity: 0,
          transform: "translateX(30px) scaleX(0.3) scaleY(0.5)",
          transformOrigin: "center 170%"
        }),
        animate(`${MESSAGE_ANIMATION_TIME}ms ${BEZIER}`, style({
          opacity: 1,
          transform: "translateX(0) scale(1)",
          transformOrigin: "center 170%"
        }))
      ]),
      transition(":leave", [
        style({
          opacity: 1,
          transform: "translateX(0) scale(1)",
          transformOrigin: "center 170%"
        }),
        animate(`${MESSAGE_ANIMATION_TIME}ms ${BEZIER}`, style({
          opacity: 0,
          transform: "translateX(30px) scaleX(0.3) scaleY(0.5)",
          transformOrigin: "center 170%"
        }))
      ])
    ])
  ]
})
export class ErrorReportWidgetComponent implements OnInit {

  loaderShown: boolean = false;
  widgetShown: boolean = false;
  widgetState: string = MESSAGE_HIDDEN;

  errorReportForm: FormGroup;
  errorMessage: FormControl = new FormControl('', Validators.required);
  errorReportSubmitButtonDisabled: boolean = false;

  @ViewChild("msg") msg: MessageComponent;



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
    this.widgetState = MESSAGE_SHOWN;
  }



  public hideWidget(): void {
    this.errorReportForm.reset();
    this.widgetShown = false;
    this.widgetState = MESSAGE_HIDDEN;
  }



  public submitReport(): void {
    if(this.errorReportForm.valid) {
      this.loaderShown = true;
      this.errs.addErrorReport(this.errorReportForm.value)
        .subscribe(res => {
          this.hideWidget();
          this.msg.showWithText(res.state);
        }, null, () => this.loaderShown = false);
    }
  }
}