import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { InputComponent } from '../../../../components/input/input.component';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { LoginService } from '../../../../services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hasErrors: boolean = false;

  @ViewChild("username") username: InputComponent;
  @ViewChild("loginLoader") loginLoader: LoaderComponent;

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private ls: LoginService
  ) {}

  ngOnInit() {
    this.title.setTitle("EngApp - Zaloguj się");
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.username.focus();
  }


  public login(): void {
    if(this.loginForm.valid) {
      this.loginLoader.show();
      this.ls.login(this.loginForm.value)
        .subscribe(() => {}, () => {
          this.hasErrors = true;
          this.loginForm.reset();
          this.username.focus();
        }, () => this.loginLoader.hide());
    }
  }

}
