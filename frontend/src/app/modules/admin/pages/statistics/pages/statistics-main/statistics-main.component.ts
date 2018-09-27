import { Component, OnInit } from '@angular/core';
import "rxjs/add/operator/finally";
import { listAnimation } from '../../../../../../animations/animations';
import { UserStatistics } from '../../../../../../services/user-statistics/UserStatistics';
import { UserStatisticsService } from './../../../../../../services/user-statistics/user-statistics.service';


@Component({
  selector: 'app-statistics-main',
  templateUrl: './statistics-main.component.html',
  styleUrls: ['./statistics-main.component.scss'],
  animations: [listAnimation]
})
export class StatisticsMainComponent implements OnInit {

  loading: boolean = true;

  userStatistics: UserStatistics[] = [];

  constructor(private uss: UserStatisticsService) {}

  ngOnInit() {
    this.uss.findAll()
      .subscribe(res => this.userStatistics = res);
  }

}
