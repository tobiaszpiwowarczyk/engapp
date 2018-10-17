import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import "rxjs/add/operator/filter";
import { listAnimation } from '../../../../../../animations/animations';
import { SocketService } from '../../../../../../services/socket/socket.service';
import { UserStatisticsService } from './../../../../../../services/user-statistics/user-statistics.service';
import { UserStatistics } from './../../../../../../services/user-statistics/UserStatistics';


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
    private cdf: ChangeDetectorRef,
    private title: Title,
    private socket: SocketService
  ) { }

  ngOnInit() {
    this.uss.findAll()
      .subscribe(res => {
        this.userStatistics = res;
        this.loading = false;
        this.title.setTitle("Statystyki - EngApp Panel");
      });

    this.socket.listenData("/topic/user-statistics")
      .subscribe(res => {
        this.userStatistics.unshift(res);
        this.cdf.detectChanges();
      });
  }
}
