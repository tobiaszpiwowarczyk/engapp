import { ButtonComponent } from './../button.component';
import { Directive, Input, OnInit } from '@angular/core';

@Directive({ selector: 'app-button[disabled]' })
export class ButtonDisabledDirective implements OnInit {

  @Input() disabled: boolean = true;

  constructor(private component: ButtonComponent) {}

  ngOnInit(): void {
    this.component.disabled = this.disabled;
  }
}