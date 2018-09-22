import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import "rxjs/add/operator/finally";
import { LoaderComponent } from '../../../../../components/loader/loader.component';
import { MessageComponent } from '../../../../../components/message/message.component';
import { SwitchComponent } from '../../../../../components/switch/switch.component';
import { LoginService } from '../../../../../services/login/login.service';
import { ThemeService } from '../../../../../services/theme/theme.service';
import { User } from '../../../../../services/user/User';
import { UserService } from '../../../../../services/user/user.service';
import { EmailValidator } from '../../../../../validator/EmailValidator';
import { NameValidator } from '../../../../../validator/NameValidator';
import { UsernameValidator } from '../../../../../validator/UsernameValidator';
import {jarallax} from "jarallax";
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: User;
  backgroundPosition: string = "50% 0";

  accountForm: FormGroup;
  errors: any[] = [];

  @ViewChild("accountSettingsLoader") accountSettingsLoader: LoaderComponent;
  @ViewChild("accountSettingsMessage") accountSettingsMessage: MessageComponent;
  @ViewChild("themeSwitch") themeSwitch: SwitchComponent;

  constructor(
    private ls: LoginService,
    private us: UserService,
    private fb: FormBuilder,
    private themeService: ThemeService,
    private el: ElementRef,
    private title: Title
  ) { }

  ngOnInit() {
    this.ls.getUserData()
      .subscribe((user: User) => {
        this.user = user;
        this.title.setTitle(`${user.firstName} ${user.lastName} - EngApp`);
      });
    this.accountForm = this.fb.group({
      id: [this.user.id, Validators.required],
      username: [
        this.user.username, Validators.compose([Validators.required, Validators.minLength(6)]),
        UsernameValidator.checkExistence(this.us, this.ls)
      ],
      firstName: [this.user.firstName, Validators.compose([Validators.required, NameValidator.validate])],
      lastName: [this.user.lastName, Validators.compose([Validators.required, NameValidator.validate])],
      email: [
        this.user.email, Validators.compose([Validators.required, EmailValidator.validate]),
        EmailValidator.checkExistence(this.us, this.ls)
      ]
    });
    this.themeSwitch.value = this.themeService.isDarkTheme();
  }

  public update(): void {
    this.accountSettingsLoader.show();
    this.us.updateUser(this.accountForm.value)
      .finally(() => this.accountSettingsLoader.hide())
      .subscribe((res: User) => {
        this.ls.saveUserData(res);
        this.accountSettingsMessage.show();

        for(const c in this.accountForm.controls) {
          this.accountForm.controls[c].markAsPristine();
        }

      }, err => this.errors = err);
  }

  public switchTheme(dark: boolean): void {
    this.themeService.switchTheme(dark ? "dark" : "light");
  }
}
