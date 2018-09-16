import { Directive, Input, OnInit } from '@angular/core';
import { ModalComponent } from '../modal.component';

@Directive({ selector: 'app-modal[preventApprove]' })
export class ModalPreventApproveDirective implements OnInit {

  @Input() preventApprove: boolean = true;

  constructor(private component: ModalComponent) {}

  ngOnInit(): void {
    this.component.preventApprove = this.preventApprove;
  }
}