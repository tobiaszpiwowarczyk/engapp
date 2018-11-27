import { Component, Input, OnInit } from '@angular/core';
import "rxjs/add/operator/filter";
import { defaultSettings, itemAnimation } from '../../../animations/animations';
import { MessageService } from '../services/message.service';
import { Message } from '../util/Message';
import { messageProgressAnimation, PROGRESS_INITIAL, PROGRESS_LOADING } from '../util/message-animations';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [itemAnimation, messageProgressAnimation]
})
export class MessageComponent implements OnInit {

  @Input() data: Message;

  progressState: string = PROGRESS_INITIAL;
  hideable: boolean = false;
  msgShown: boolean = false;


  constructor(private ms: MessageService) { }
  ngOnInit(): void {
    this.ms.hideable
      .filter(res => res == true)
      .subscribe((res: boolean) => {
        this.hideable = res;
        if(res) setTimeout(() => this.hide(), defaultSettings.progress.time + defaultSettings.item.time);
      });
  }



  public runProgress(): void {
    this.msgShown = true;
    if(this.data.shown && this.hideable) {
      this.progressState = PROGRESS_LOADING;
    }
  }


  public hide(): void {
    if(this.data.shown && this.msgShown) {
      this.progressState = PROGRESS_INITIAL;
      this.data.shown = false;
      setTimeout(() => this.ms.remove(this.data.id), defaultSettings.item.time);
    }
  }
}
