import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { ErrorReport } from "../../../../../services/error-report/ErrorReport";
import { ErrorReportService } from './../../../../../services/error-report/error-report.service';


@Injectable()
export class ErrorReportResolver implements Resolve<ErrorReport> {

  constructor(
    private errs: ErrorReportService
  ) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<ErrorReport> {
    return this.errs.findById(route.params["id"]);
  }

}