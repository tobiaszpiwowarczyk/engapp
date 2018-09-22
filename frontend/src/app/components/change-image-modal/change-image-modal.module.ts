import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileInputModule } from './../file-input/file-input.module';
import { CommonModule } from '@angular/common';
import { ChangeImageModalComponent } from './change-image-modal.component';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { ModalModule } from '../modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    FileInputModule,
    ButtonModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ChangeImageModalComponent],
  declarations: [ChangeImageModalComponent],
  providers: [],
})
export class ChangeImageModalModule { }
