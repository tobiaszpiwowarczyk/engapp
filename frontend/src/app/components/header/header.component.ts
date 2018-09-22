import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { User } from '../../services/user/User';
import { MenuOpenerComponent } from './menu-opener/menu-opener.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  @ViewChild("opener") opener: MenuOpenerComponent;

  user: User;
  opened: boolean = false;
  contentFluid: boolean = false;

  constructor() {}
  ngOnInit() {}

  public open(evt: boolean): void {
    this.opened = evt;
  }

  public close(): void {
    this.opened = false;
    this.opener.opened = false;
  }
}
