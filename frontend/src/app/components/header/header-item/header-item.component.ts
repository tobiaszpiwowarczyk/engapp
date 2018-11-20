import { Component, Input, OnInit, HostListener } from '@angular/core';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.scss']
})
export class HeaderItemComponent implements OnInit {

  @Input() label: string = "";
  @Input() itemType: string = "icon";
  @Input() imageSrc: string = "";
  @Input() href: any[] = [];

  constructor(private hs: HeaderService) { }
  ngOnInit() { }

  @HostListener("click")
  closeAfterClick(): void {
    this.hs.setMenuOpen(false);
  }
}
