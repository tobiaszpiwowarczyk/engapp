import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login/login.service';
import { User } from '../../../../services/user/User';
import { SidebarService } from '../../components/sidebar/services/sidebar.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user: User;
  sidebarExpanded: boolean = false;

  constructor(
    private ls: LoginService,
    private sidebar: SidebarService
  ) { }
  ngOnInit() {
    this.ls.getUserData().subscribe((res: User) => this.user = res);
    this.sidebar.expanded.subscribe(e => this.sidebarExpanded = e);
  }

  public logout = () => this.ls.logout();
  public expand(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
    this.sidebar.setExpanded(this.sidebarExpanded);
  }
}
