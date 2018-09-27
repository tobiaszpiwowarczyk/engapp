import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { UserStatistics } from '../../services/user-statistics/UserStatistics';
import { listItemAnimation } from '../../animations/animations';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss'],
  animations: [listItemAnimation]
})
export class UserStatisticsComponent implements OnInit {

  @Input() data: UserStatistics;
  @Input() last: boolean = false;

  forAdmin: boolean = false;

  constructor() { }
  ngOnInit() {}


  public formatDate(date: Date): string {
    const months = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
    const days = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();

    return date.getFullYear() + "-" + months + "-" + days;
  }

  public formatTime(date: Date): string {
    const hours = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  }

}
