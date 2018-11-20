import { Directive } from '@angular/core';
import { MessageContainerComponent } from '../message-container/message-container.component';

@Directive({ selector: 'app-message-container[floating]' })
export class MessageFloatingDirective {
  constructor(private c: MessageContainerComponent) {
    this.c.floating = true;
  }
}