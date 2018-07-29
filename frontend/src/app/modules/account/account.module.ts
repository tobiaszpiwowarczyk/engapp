import { LoaderModule } from './../../components/loader/loader.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderModule } from '../../components/header/header.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './pages/account/account.component';
import { TabModule } from '../../components/tab/tab.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputModule } from '../../components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    LoaderModule,
    HeaderModule,
    TabModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AccountComponent]
})
export class AccountModule { }
