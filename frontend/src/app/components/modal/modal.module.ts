import { ModalFooterTypeDirective } from './directives/modal-footer-type.directive';
import { ModalComponent } from './modal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { InputGroupModule } from '../input-group/input-group.module';
import { ModalPreventApproveDirective } from './directives/modal-pervent-approve.directive';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputGroupModule
  ],
  declarations: [ModalComponent, ModalFooterTypeDirective, ModalPreventApproveDirective],
  exports: [ModalComponent, ModalFooterTypeDirective, ModalPreventApproveDirective]
})
export class ModalModule { }
