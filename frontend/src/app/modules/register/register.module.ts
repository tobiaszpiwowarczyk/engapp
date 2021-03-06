import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../components/input/input.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { ButtonModule } from '../../components/button/button.module';

@NgModule({
  imports: [
    InputModule,
    LoaderModule,
    CommonModule,
    ButtonModule,
    RegisterRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
