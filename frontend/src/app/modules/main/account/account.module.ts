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
import { ButtonModule } from '../../../components/button/button.module';
import { UserStatisticsService } from '../../../services/user-statistics/user-statistics.service';
import { UserStatisticsModule } from '../../../components/user-statistics/user-statistics.module';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    LoaderModule,
    HeaderModule,
    TabModule,
    SwitchModule,
    MessageModule,
    ButtonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileModule,
    UserStatisticsModule
  ],
  declarations: [AccountComponent],
  providers: [UserStatisticsService]
})
export class AccountModule { }
