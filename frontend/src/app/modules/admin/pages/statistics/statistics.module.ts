import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderModule } from '../../../../components/loader/loader.module';
import { UserStatisticsService } from '../../../../services/user-statistics/user-statistics.service';
import { UserStatisticsModule } from './../../../../components/user-statistics/user-statistics.module';
import { StatisticsMainComponent } from './pages/statistics-main/statistics-main.component';
import { StatisticsRoutingRoutingModule } from './statistics-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingRoutingModule,
    UserStatisticsModule,
    LoaderModule
  ],
  declarations: [StatisticsMainComponent],
  exports: [StatisticsMainComponent],
  providers: [UserStatisticsService]
})
export class StatisticsModule { }
