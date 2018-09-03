import { Component, OnInit } from '@angular/core';
import { User } from '../../../../services/user/User';
import { UserService } from '../../../../services/user/user.service';
import { LoginService } from '../../../../services/login/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  user: User;

  constructor(
    private us: UserService,
    private ls: LoginService
  ) { }
  ngOnInit() {
    this.us.account().subscribe((res: User) => this.user = res);
  }

  public logout = () => this.ls.logout();
}
