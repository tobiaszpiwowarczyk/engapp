import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { ThemeService } from './services/theme/theme.service';
import { User } from './services/user/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private ls: LoginService,
    private theme: ThemeService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.theme.initTheme();

    if(this.ls.isAuthenticated()) {
      this.ls.validateToken()
        .subscribe(() => this.ls.account()
          .subscribe((res: User) => {
            this.ls.saveUserData(res);

            if(window.location.pathname == "/login" || window.location.pathname == "/register") {
              this.router.navigate(["/"]);
            }

          }), () => this.ls.logout());
    }
    else this.ls.logout();
  }

}
