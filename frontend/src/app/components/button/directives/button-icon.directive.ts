import { ButtonComponent } from '../button.component';
import { Directive, Input, OnInit } from '@angular/core';

@Directive({ selector: 'app-button[icon]' })
export class ButtonIconDirective implements OnInit {

  @Input() icon: string = "";

  constructor(
    private component: ButtonComponent
  ) {}

  ngOnInit() {
    this.component.icon = this.icon;
  }
}