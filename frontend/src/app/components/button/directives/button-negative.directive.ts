import { Directive } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Directive({ selector: 'app-button[negative]' })
export class ButtonNegativeDirective {
  constructor(private component: ButtonComponent) {
    this.component.negative = true;
  }
}