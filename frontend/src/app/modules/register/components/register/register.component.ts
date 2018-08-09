import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import "rxjs/add/operator/finally";
import { InputComponent } from '../../../../components/input/input.component';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { Credentials } from '../../../../services/login/Credentials';
import { LoginService } from '../../../../services/login/login.service';
import { User } from '../../../../services/user/User';
import { UserService } from '../../../../services/user/user.service';
import { EmailValidator } from '../../../../validator/EmailValidator';
import { NameValidator } from '../../../../validator/NameValidator';
import { PasswordStrength } from '../../../../validator/PasswordStrength';
import { UsernameValidator } from '../../../../validator/UsernameValidator';


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
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)]), UsernameValidator.validate(this.us)],
      password: ['', Validators.compose([Validators.required, Validators.minLength(7), PasswordStrength.validate])],
      firstName: ['', Validators.compose([Validators.required, NameValidator.validate])],
      lastName: ['', Validators.compose([Validators.required, NameValidator.validate])],
      email: ['', Validators.compose([Validators.required, EmailValidator.validate]), EmailValidator.isUnique(this.us)]
    });

    this.username.focus();
    console.log(this.registerForm);
  }


  public register(): void {
    if(this.registerForm.valid) {
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
    else {
      for(const c in this.registerForm.controls) {
        this.registerForm.controls[c].markAsDirty();
      }
    }
  }

  public filterErrors(field: string): any[] {
    return this.errors.filter(x => x.field == field);
  }

}
