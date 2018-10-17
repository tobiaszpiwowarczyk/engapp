import { ErrorReport } from './../../../../../../services/error-report/ErrorReport';
import { ErrorReportService } from './../../../../../../services/error-report/error-report.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-reports-main',
  templateUrl: './error-reports-main.component.html'
})
export class ErrorReportsMainComponent implements OnInit {

  errorReports: ErrorReport[] = [];
  loading: boolean = true;

  constructor(
    private errs: ErrorReportService,
    private title: Title
  ) { }

  ngOnInit() {
    this.errs.findAll()
      .subscribe(res => {
        this.errorReports = res;
        this.loading = false;
        this.title.setTitle("Zgłoszone błędy - EngApp Panel");
      });
  }


  public markAsRead(id: any): void {
    if(id.constructor.name == "String") id = [id];
    this.errs.markAsRead(id)
      .subscribe(() => this.errorReports[this.errorReports.map(x => x.id).indexOf(id)].read = true);
  }


  public deleteReport(id: string): void {
    this.errs.deleteReport(id)
      .subscribe(() => this.errorReports.splice(this.errorReports.map(x => x.id).indexOf(id), 1));
  }

}
