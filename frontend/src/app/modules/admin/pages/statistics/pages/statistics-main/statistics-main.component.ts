import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { listAnimation } from '../../../../../../animations/animations';
import { UserStatistics } from '../../../../../../services/user-statistics/UserStatistics';
import { UserStatisticsService } from './../../../../../../services/user-statistics/user-statistics.service';

import "rxjs/add/operator/filter";

@Component({
  selector: 'app-statistics-main',
  templateUrl: './statistics-main.component.html',
  styleUrls: ['./statistics-main.component.scss'],
  animations: [listAnimation]
})
export class StatisticsMainComponent implements OnInit {

  loading: boolean = true;

  userStatistics: UserStatistics[] = [];

  constructor(
    private uss: UserStatisticsService,
    private cdf: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.uss.findAll()
      .subscribe(res => {
        this.userStatistics = res;
        this.loading = false;
      });

    this.uss.onUserStatisticsAdd
      .filter(res => res != null)
      .subscribe(res => {
        this.userStatistics.unshift(res);
        this.cdf.detectChanges();
      });
  }

}
