import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import { SocketService } from '../../../../../../services/socket/socket.service';
import { ErrorReportService } from './../../../../../../services/error-report/error-report.service';
import { ErrorReport } from './../../../../../../services/error-report/ErrorReport';
import { TableSortableService, FilterProperty } from '../../../../../../components/table-sortable-filter/services/table-sortable.service';


@Component({
  selector: 'app-error-reports-main',
  templateUrl: './error-reports-main.component.html'
})
export class ErrorReportsMainComponent implements OnInit, OnDestroy {

  errorReports: ErrorReport[] = [];
  loading: boolean = true;

  filterProperties: FilterProperty[] = [];

  constructor(
    private errs: ErrorReportService,
    private title: Title,
    private socket: SocketService,
    private ngZone: NgZone,
    private tss: TableSortableService
  ) { }

  ngOnInit() {
    this.errs.errorReports
      .subscribe(res => {

        this.tss.initData(res);

        this.tss.data.subscribe(data => {
          this.errorReports = data;
          this.loading = false;
          this.title.setTitle("Zgłoszone błędy - EngApp Panel");
        });

        this.tss.retrieveFilterProperties()
          .subscribe(props => this.filterProperties = props);
      });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }



  public markAsRead(id: any): void {
    if(id.constructor.name == "String") id = [id];
    this.errs.markAsRead(id)
      .subscribe(() => {
        id.forEach(x => {
          this.ngZone.run(() => this.errs.errorReports.getValue()[this.errorReports.map(y => y.id).indexOf(x)].read = true);
        });
      });
  }


  public deleteReport(id: string): void {
    this.errs.deleteReport(id)
      .subscribe(() => this.errorReports.splice(this.errorReports.map(x => x.id).indexOf(id), 1));
  }


  public toggleFilter = (): void => this.tss.toggleFilter();
}
