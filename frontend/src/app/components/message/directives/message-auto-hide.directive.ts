import { Directive } from '@angular/core';
import { MessageComponent } from '../message.component';

@Directive({ selector: 'app-message[autoHide]' })
export class MessageAutoHideDirective {
  constructor(private component: MessageComponent) {
    this.component.autoHide = true;
  }
}