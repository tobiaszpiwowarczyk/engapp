import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { InputComponent } from '../../../../components/input/input.component';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { User } from '../../../../services/user/User';
import { UserService } from '../../../../services/user/user.service';

import "rxjs/add/operator/finally";
import { LoginService } from '../../../../services/login/login.service';
import { Credentials } from '../../../../services/login/Credentials';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  @ViewChild("username") username: InputComponent;
  @ViewChild("registerLoader") registerLoader: LoaderComponent;

  registerForm: FormGroup;
  errors: any[] = [];

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private us: UserService,
    private ls: LoginService
  ) {}

  ngOnInit() {
    this.title.setTitle("EngApp - Zarejestruj się");

    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      email: ['']
    });

    this.username.focus();
  }


  public register(): void {
    this.registerLoader.show();
    this.us.register(new User(this.registerForm.value))
        .finally(() => this.registerLoader.hide())
        .subscribe(res => {
          this.ls.login(new Credentials(res.username, this.registerForm.controls.password.value))
            .subscribe();
        }, err => {
          this.errors = err;
        });
  }

  public filterErrors(field: string): any[] {
    return this.errors.filter(x => x.field == field);
  }

}
