import { MenuOpenerComponent } from './menu-opener/menu-opener.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../services/user/User';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [LoginService, UserService],
})
export class HeaderComponent implements OnInit {

  @ViewChild("opener") opener: MenuOpenerComponent;

  user: User;
  opened: boolean = false;

  constructor(
    private ls: LoginService,
    private us: UserService
  ) { }

  ngOnInit() {

    this.us.account()
      .subscribe(res => {
        this.ls.saveUserData(res);
        this.user = this.us.getUserData();
      }, err => console.error(err));

    if(this.us.getUserData() != null) {
      this.user = this.us.getUserData();
    }
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
