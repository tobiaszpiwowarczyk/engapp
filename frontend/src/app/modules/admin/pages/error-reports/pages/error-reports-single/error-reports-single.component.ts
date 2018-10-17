import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorReport } from '../../../../../../services/error-report/ErrorReport';

@Component({
  selector: 'app-error-reports-single',
  templateUrl: './error-reports-single.component.html'
})
export class ErrorReportsSingleComponent implements OnInit {

  errorReport: ErrorReport;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(res => this.errorReport = res["errorReport"]);
  }

}
