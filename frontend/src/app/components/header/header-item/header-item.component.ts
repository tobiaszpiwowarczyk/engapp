import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.scss']
})
export class HeaderItemComponent implements OnInit {

  @Input() label: string = "";
  @Input() itemType: string = "icon";
  @Input() imageSrc: string = "";

  constructor() { }

  ngOnInit() {
  }

}
