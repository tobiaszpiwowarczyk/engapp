import { ErrorReportsSingleComponent } from './pages/error-reports-single/error-reports-single.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorReportsMainComponent } from './pages/error-reports-main/error-reports-main.component';
import { ErrorReportResolver } from './resolver/error-reports.resolver';

const routes: Routes = [
  { path: '', component: ErrorReportsMainComponent },
  { path: ':id', component: ErrorReportsSingleComponent, resolve: { errorReport: ErrorReportResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorReportsRoutingModule { }