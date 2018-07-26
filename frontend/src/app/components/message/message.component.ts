import { MessageTypeFactory } from './MessageTypeFactory';
import { Component, OnInit, Input } from '@angular/core';
import { IMessage } from './MessageType';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() type: string = "success";
  @Input() content: string = "";

  messageType: IMessage;
  shown: boolean = false;

  constructor() {}

  ngOnInit() {
    this.messageType = MessageTypeFactory.getInstance(this.type);
  }
}
