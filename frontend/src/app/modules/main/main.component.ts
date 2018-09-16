import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../services/user/User';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  user: User;

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

}
