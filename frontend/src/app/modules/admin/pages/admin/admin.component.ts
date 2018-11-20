import { Component, NgZone, OnInit } from '@angular/core';
import "rxjs/add/operator/filter";
import { ErrorReportService } from '../../../../services/error-report/error-report.service';
import { LoginService } from '../../../../services/login/login.service';
import { SocketService } from '../../../../services/socket/socket.service';
import { User } from '../../../../services/user/User';
import { SidebarService } from '../../components/sidebar/services/sidebar.service';
import { ErrorReport } from '../../../../services/error-report/ErrorReport';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user: User;
  sidebarExpanded: boolean = false;
  unreadErrors: number = 0;
  loading: boolean = true;

  constructor(
    private ls: LoginService,
    private sidebar: SidebarService,
    private socket: SocketService,
    private errs: ErrorReportService,
    private ngZone: NgZone
  ) { }
  ngOnInit() {

    this.ls.tokenValid.subscribe((valid: boolean) => {
      if(valid) {

        this.loading = false;

        this.ls.getUserData().subscribe((res: User) => this.user = res);
        this.sidebar.expanded.subscribe(e => this.sidebarExpanded = e);

        this.errs.findAll()
          .subscribe(res => {
            this.errs.errorReports.next(res);
            this.unreadErrors = res.filter(x => !x.read).length;
          });

        this.socket.listenData("/topic/count-error-reports")
          .filter(res => res.constructor.name == "Number")
          .subscribe((res) => {
            this.ngZone.run(() => this.unreadErrors = res);
          });

        this.socket.listenData("/topic/error-reports")
          .filter(res => res.constructor.name == "Object")
          .subscribe((res: ErrorReport) => {
            this.ngZone.run(() => this.errs.errorReports.getValue().unshift(res));
          });
      }
    });
  }

  public logout = () => this.ls.logout();
  public expand(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
    this.sidebar.setExpanded(this.sidebarExpanded);
  }
}
