import { Component, Input } from '@angular/core';
import { messageAnimation, messageProgressAnimation, MESSAGE_HIDDEN,
  MESSAGE_SHOWN, PROGRESS_INITIAL, PROGRESS_LOADING, MESSAGE_ANIMATION_TIME } from './util/message-animations';
import { IMessage, MessageType } from './util/MessageType';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [messageAnimation, messageProgressAnimation]
})
export class MessageComponent {

  @Input() content: string = "";

  messageAnimationState: string = MESSAGE_HIDDEN;
  progressState: string = PROGRESS_INITIAL;

  messageType: IMessage = MessageType.SUCCESS;
  shown: boolean = false;
  floating: boolean = false;
  autoHide: boolean = false;

  constructor() {}

  public show(): void {
    this.shown = true;
    this.messageAnimationState = MESSAGE_SHOWN;
  }

  public showWithText(message: string): void {
    this.content = message;
    this.show();
  }

  public runProgress(): void {
    if(this.autoHide && this.messageAnimationState == MESSAGE_SHOWN) {
      this.progressState = PROGRESS_LOADING;
    }
  }

  public hide(): void {
    this.messageAnimationState = MESSAGE_HIDDEN;
    this.progressState = PROGRESS_INITIAL;
    setTimeout(() => this.shown = false, MESSAGE_ANIMATION_TIME);
  }
}
