import { Directive } from '@angular/core';
import { MessageComponent } from '../message.component';

@Directive({ selector: 'app-message[floating]' })
export class MessageFloatingDirective {
  constructor(private component: MessageComponent) {
    this.component.floating = true;
  }
}