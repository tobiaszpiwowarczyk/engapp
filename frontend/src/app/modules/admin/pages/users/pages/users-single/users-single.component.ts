import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../../services/user/User';
import { UserService } from '../../../../../../services/user/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users-single',
  templateUrl: './users-single.component.html',
  styleUrls: ['./users-single.component.scss', '../../../../scss/profile.scss']
})
export class UsersSingleComponent implements OnInit {

  user: User;
  loading: boolean = true;

  constructor(
    private us: UserService,
    private route: ActivatedRoute,
    private title: Title
  ) {}
  ngOnInit() {
    this.route.params.subscribe(route => {
      this.us.findByUsername(route.username)
        .subscribe((user: User) => {
          this.user = user;
          this.title.setTitle(`${user.firstName} ${user.lastName} - EngApp Panel`);
        }, err => console.error(err),
        () => this.loading = false);
    });
  }

}
