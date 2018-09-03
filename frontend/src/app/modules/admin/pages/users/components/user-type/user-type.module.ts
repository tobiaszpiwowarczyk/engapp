import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserTypeComponent } from './user-type.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserTypeComponent],
  exports: [UserTypeComponent]
})
export class UserTypeModule { }
