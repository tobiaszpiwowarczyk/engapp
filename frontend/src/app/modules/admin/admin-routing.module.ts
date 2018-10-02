import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: '', loadChildren: "./pages/dashboard/dashboard.module#DashboardModule" },
    { path: 'users', loadChildren: "./pages/users/users.module#UsersModule" },
    { path: 'units', loadChildren: "./pages/units/units.module#UnitsModule" },
    { path: 'statistics', loadChildren: "./pages/statistics/statistics.module#StatisticsModule" }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }