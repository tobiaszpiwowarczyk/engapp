import { Directive } from '@angular/core';
import { MessageService } from '../services/message.service';

@Directive({ selector: 'app-message-container[hideable]' })
export class MessageHideableDirective {
  constructor(private ms: MessageService) {
    this.ms.hideable.next(true);
  }
}