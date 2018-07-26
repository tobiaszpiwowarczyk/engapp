import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [LoginService]
})
export class AppComponent implements OnInit {

  constructor(
    private ls: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.ls.isAuthenticated()) {
      if(window.location.pathname !== "/register" && window.location.pathname !== "/login") {
        this.router.navigate(["/login"]);
      }
    }
  }

}
