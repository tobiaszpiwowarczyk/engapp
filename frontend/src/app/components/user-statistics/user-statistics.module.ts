import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatisticsComponent } from './user-statistics.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  declarations: [UserStatisticsComponent],
  exports: [UserStatisticsComponent]
})
export class UserStatisticsModule { }
