import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../services/user/User';
import { LoginService } from '../../services/login/login.service';
import { MenuOpenerComponent } from '../../components/header/menu-opener/menu-opener.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  @ViewChild("opener") opener: MenuOpenerComponent;

  user: User;
  opened: boolean = false;

  constructor(
    private ls: LoginService
  ) { }

  ngOnInit() {
    this.ls.getUserData()
      .subscribe((res: User) => this.user = res);
  }

  public logout(): void {
    this.ls.logout();
  }

  public open(evt: boolean): void {
    this.opened = evt;
  }

  public close(): void {
    this.opened = false;
    this.opener.opened = false;
  }

}
