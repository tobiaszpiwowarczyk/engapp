import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-opener',
  templateUrl: './menu-opener.component.html',
  styleUrls: ['./menu-opener.component.scss']
})
export class MenuOpenerComponent implements OnInit {

  @Output() onOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  opened: boolean = false;

  constructor() { }
  ngOnInit() {}


  public open(): void {
    this.opened = !this.opened;
    this.onOpen.emit(this.opened);
  }
}
