import { ButtonComponent } from './../button.component';
import { Directive } from '@angular/core';

@Directive({ selector: 'app-button[primary]' })
export class ButtonPrimaryDirective {
  constructor(private component: ButtonComponent) {
    this.component.primary = true;
  }
}