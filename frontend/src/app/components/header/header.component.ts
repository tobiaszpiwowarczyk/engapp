import { Component, OnInit, ViewChild, DoCheck, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../services/user/User';
import { MenuOpenerComponent } from './menu-opener/menu-opener.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @ViewChild("opener") opener: MenuOpenerComponent;

  user: User;
  opened: boolean = false;
  subtitleShown: boolean = false;

  constructor(
    private ls: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.ls.getUserData();
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

  public account(): void {
    this.router.navigate(["/account", this.user.username]);
  }

  public showSubtitle(): void {
    this.subtitleShown = true;
  }
}
