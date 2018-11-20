import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IMessage } from '../util/MessageType';
import { Message } from '../util/Message';

@Injectable()
export class MessageService {

  private maxLength: number = 8;
  private _messages: Message[] = [];
  messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(this._messages);
  hideable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public show(text: string, type: IMessage) {
    if(this._messages.length < this.maxLength) {
      this._messages.unshift({ id: this._messages.length + 1, text: text, type: type, shown: true });
      this.messages.next(this._messages);
    }
  }

  public remove(id: number) {
    this._messages.splice(this._messages.map(x => x.id).indexOf(id), 1);
    this.messages.next(this._messages);
  }
}