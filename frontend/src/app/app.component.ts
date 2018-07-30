import { ThemeService } from './services/theme/theme.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { User } from './services/user/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private ls: LoginService,
    private router: Router,
    private theme: ThemeService
  ) {}

  ngOnInit(): void {

    this.theme.initTheme();

    if (!this.ls.isAuthenticated()) {
      if(window.location.pathname !== "/register" && window.location.pathname !== "/login") {
        this.router.navigate(["/login"]);
      }
    }
    else {
      this.ls.account()
        .subscribe((res: User) => this.ls.saveUserData(res), err => {
          if(err.error == "invalid_token")
            this.ls.logout();
        });
    }
  }

}
