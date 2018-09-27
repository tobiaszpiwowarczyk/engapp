import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatisticsComponent } from './user-statistics.component';
import { IconModule } from '../icon/icon.module';
import { UserStatisticsForAdminDirective } from './directives/user-statistics-for-admin.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    RouterModule
  ],
  declarations: [
    UserStatisticsComponent,
    UserStatisticsForAdminDirective
  ],
  exports: [
    UserStatisticsComponent,
    UserStatisticsForAdminDirective
  ]
})
export class UserStatisticsModule { }
