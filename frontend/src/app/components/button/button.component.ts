import { Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {

  @Input() type: string = "button";
  @Input() disabled: boolean = false;
  @Input() style: any = {};
  @Input() ngClass: any = {};

  fluid: boolean = false;
  circular: boolean = false;
  negative: boolean = false;
  primary: boolean = false;
  icon: string = "";

  constructor() {}
  ngOnInit() {}

  @HostListener("click", ["$event"])
  public preventDisableClicking(e): void {
    if(this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

}
