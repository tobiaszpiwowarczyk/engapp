import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  usersSearchForm: FormGroup;
  name: FormControl = new FormControl("");

  constructor(
    private us: UserService,
    private title: Title,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.us.findAll()
      .subscribe((res: User[]) => {
        this.users = res;
        this.title.setTitle("Użytkownicy - EngApp Panel");
        this.loading = false;
      });

    this.usersSearchForm = this.fb.group({
      name: this.name
    });
  }
}