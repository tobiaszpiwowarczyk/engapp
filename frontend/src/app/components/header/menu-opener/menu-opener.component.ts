import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-menu-opener',
  templateUrl: './menu-opener.component.html',
  styleUrls: ['./menu-opener.component.scss']
})
export class MenuOpenerComponent implements OnInit {

  @Output() onOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  opened: boolean = false;

  constructor(private hs: HeaderService) { }
  ngOnInit() {
    this.hs.menuOpen.subscribe(res => this.opened = res);
  }


  public open(): void {
    this.opened = !this.opened;
    this.onOpen.emit(this.opened);
    this.hs.setMenuOpen(this.opened);
  }
}
