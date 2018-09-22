import { UnitsMainComponent } from './pages/units-main/units-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitsSingleComponent } from './pages/units-single/units-single.component';

const routes: Routes = [
  { path: '', component: UnitsMainComponent },
  { path: ':id', component: UnitsSingleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitsRoutingModule { }