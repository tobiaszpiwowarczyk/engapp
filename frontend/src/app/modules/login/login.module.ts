import { LoaderModule } from '../../components/loader/loader.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../components/input/input.module';
import { LoginComponent } from './pages/login/login.component';
import { LoginRoutingModule } from './login-route.module';
import { HttpModule } from '@angular/http';
import { MessageModule } from '../../components/message/message.module';
import { ButtonModule } from '../../components/button/button.module';
@NgModule({
  imports: [
    InputModule,
    MessageModule,
    LoaderModule,
    ButtonModule,
    CommonModule,
    LoginRoutingModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
