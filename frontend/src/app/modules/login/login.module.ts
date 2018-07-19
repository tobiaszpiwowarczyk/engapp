import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InputModule } from '../../components/input/imput.module';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {path: "", component: LoginComponent}
];

@NgModule({
  imports: [
    InputModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
