import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import "rxjs/add/operator/finally";
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { User } from '../../../../services/user/User';
import { UserService } from '../../../../services/user/user.service';
import { LoginService } from './../../../../services/login/login.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  host: {
    "(window:scroll)": "parallax($event)"
  }
})
export class AccountComponent implements OnInit {

  user: User;
  backgroundPosition: string = "50% 0";

  accountForm: FormGroup;
  errors: any[] = [];

  @ViewChild("accountSettingsLoader") accountSettingsLoader: LoaderComponent;

  constructor(
    private ls: LoginService,
    private us: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.user = this.ls.getUserData();
    this.accountForm = this.fb.group({
      id: [this.user.id],
      username: [this.user.username],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email]
    });
  }

  // todo: fix parallax issue in Chrome
  public parallax(e: MouseEvent) {
    this.backgroundPosition = `50% ${e.pageY * 0.6}px`;
  }

  public update(): void {
    this.accountSettingsLoader.show();
    this.us.updateUser(this.accountForm.value)
      .finally(() => this.accountSettingsLoader.hide())
      .subscribe((res: User) => {
        this.ls.saveUserData(res);
      }, err => this.errors = err);
  }

  public filterErrors(field: string): any[] {
    return this.errors.filter(x => x.field == field);
  }
}
