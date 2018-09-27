import { UserStatisticsComponent } from './../user-statistics.component';
import { Directive } from '@angular/core';

@Directive({ selector: 'app-user-statistics[forAdmin]' })
export class UserStatisticsForAdminDirective {
  constructor(private c: UserStatisticsComponent) {
    this.c.forAdmin = true;
  }
}