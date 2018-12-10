import { Component, Input, OnInit } from '@angular/core';
import { itemAnimation } from '../../animations/animations';
import { UserStatistics } from '../../services/user-statistics/UserStatistics';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss'],
  animations: [itemAnimation]
})
export class UserStatisticsComponent implements OnInit {

  @Input() data: UserStatistics;
  @Input() last: boolean = false;

  forAdmin: boolean = false;

  constructor() { }
  ngOnInit() { }
}
