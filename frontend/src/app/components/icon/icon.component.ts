import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: []
})
export class IconComponent implements OnInit {

  @Input() name: string;

  constructor() { }
  ngOnInit() {}

}
