import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { IMessage, MessageType } from '../util/MessageType';
import { Message } from '../util/Message';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent implements OnInit {

  messages: Message[] = [];
  floating: boolean = false;

  constructor(private ms: MessageService) { }
  ngOnInit() {
    this.ms.messages.subscribe(res => this.messages = res);
  }

  public show(text: string, type: IMessage = MessageType.SUCCESS): void {
    this.ms.show(text, type);
  }

}
