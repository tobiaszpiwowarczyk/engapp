import { Directive, Input, OnInit } from '@angular/core';
import { MessageTypeFactory } from '../util/MessageTypeFactory';
import { MessageComponent } from './../message.component';

@Directive({ selector: 'app-message[type]' })
export class MessageTypeDirective implements OnInit {

  @Input() type: string = "success";

  constructor(private component: MessageComponent) {}

  ngOnInit(): void {
    this.component.messageType = MessageTypeFactory.getInstance(this.type);
  }
}