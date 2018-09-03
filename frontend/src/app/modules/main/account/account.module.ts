import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../../../components/header/header.module';
import { InputModule } from '../../../components/input/input.module';
import { LoaderModule } from '../../../components/loader/loader.module';
import { MessageModule } from '../../../components/message/message.module';
import { SwitchModule } from '../../../components/switch/switch.module';
import { TabModule } from '../../../components/tab/tab.module';
import { ProfileModule } from './../../../directives/profile/profile.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './pages/account/account.component';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    LoaderModule,
    HeaderModule,
    TabModule,
    SwitchModule,
    MessageModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileModule
  ],
  declarations: [AccountComponent]
})
export class AccountModule { }
