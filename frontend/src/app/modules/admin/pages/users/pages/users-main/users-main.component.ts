import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../../../../../../services/user/User';
import { UserService } from './../../../../../../services/user/user.service';

@Component({
  selector: 'app-users-main',
  templateUrl: './users-main.component.html',
  styleUrls: ['./users-main.component.scss']
})
export class UsersMainComponent implements OnInit {

  users: User[];

  loading: boolean = true;

  constructor(
    private us: UserService,
    private title: Title
  ) { }
  ngOnInit() {
    this.us.findAll()
      .subscribe((res: User[]) => {
        this.users = res;
        this.title.setTitle("Użytkownicy - EngApp Panel");
        this.loading = false;
      });
  }
}