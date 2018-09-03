import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {

  @Input() type: string = "";

  large: boolean = false;

  constructor() { }
  ngOnInit() {}

}
