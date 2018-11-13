import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorReportService } from '../../../../../../services/error-report/error-report.service';
import { ErrorReport } from '../../../../../../services/error-report/ErrorReport';

@Component({
  selector: 'app-error-reports-single',
  templateUrl: './error-reports-single.component.html'
})
export class ErrorReportsSingleComponent implements OnInit {

  errorReport: ErrorReport;

  constructor(
    private route: ActivatedRoute,
    private errs: ErrorReportService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.route.data.subscribe(res => {
      this.errorReport = res["errorReport"];
      if(!this.errorReport.read) {
        this.errs.markAsRead([this.errorReport.id]).subscribe(() => {
          this.ngZone.run(() => {
            this.errs.errorReports.getValue()[this.errs.errorReports.getValue().map(y => y.id).indexOf(this.errorReport.id)].read = true;
          });
        });
      }
    });
  }

}
