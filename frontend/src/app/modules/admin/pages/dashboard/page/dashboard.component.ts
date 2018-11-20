import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageContainerComponent } from '../../../../../components/message/message-container/message-container.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("msgContainer") msgContainer: MessageContainerComponent;

  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle("EngApp Panel");
  }


  public show(): void {
    this.msgContainer.show("Wiadomość");
  }

}
