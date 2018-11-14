import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { ThemeService } from './services/theme/theme.service';
import { User } from './services/user/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private ls: LoginService,
    private theme: ThemeService
  ) { }

  ngOnInit(): void {

    this.theme.initTheme();

    if(this.ls.isAuthenticated()) {
      this.ls.validateToken()
        .subscribe(() => this.ls.account()
          .subscribe((res: User) => this.ls.saveUserData(res)), () => this.ls.logout());
    }
    else this.ls.logout();
  }

}
