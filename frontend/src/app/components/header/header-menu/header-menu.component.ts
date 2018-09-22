import { Component, OnInit } from '@angular/core';
import { HeaderService } from './../services/header.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./scss/header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  opened: boolean = false;

  constructor(private hs: HeaderService) { }

  ngOnInit() {
    this.hs.menuOpen.subscribe(h => this.opened = h);
  }

  public close(): void {
    this.opened = false;
    this.hs.setMenuOpen(false);
  }
}
