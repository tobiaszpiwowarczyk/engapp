import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { InputComponent } from '../../../../components/input/input.component';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { MessageContainerComponent } from '../../../../components/message/message-container/message-container.component';
import { LoginService } from '../../../../services/login/login.service';
import { MessageType } from '../../../../components/message/util/MessageType';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  @ViewChild("username") username: InputComponent;
  @ViewChild("loginLoader") loginLoader: LoaderComponent;
  @ViewChild("loginMessage") loginMessage: MessageContainerComponent;

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private ls: LoginService
  ) { }

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
        .subscribe(() => { }, () => {
          this.loginLoader.hide();
          this.loginMessage.show("Nieprawidłowy login lub hasło", MessageType.WARNING);
          this.loginForm.reset();
          this.username.focus();
        });
    }
  }

}
