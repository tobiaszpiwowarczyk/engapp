import { ModalFooterTypeFactory } from './../util/ModalFooterTypeFactory';
import { Directive, Input, OnInit } from '@angular/core';
import { ModalComponent } from '../modal.component';

@Directive({ selector: 'app-modal[modalFooterType]' })
export class ModalFooterTypeDirective implements OnInit {

  @Input() modalFooterType: string = "";

  constructor(private component: ModalComponent) {}

  ngOnInit(): void {
    this.component.footerType = ModalFooterTypeFactory.getModalFooterType(this.modalFooterType);
  }
}