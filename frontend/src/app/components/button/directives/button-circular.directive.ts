import { Directive } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Directive({ selector: 'app-button[circular]' })
export class ButtonCircularDirective {
  constructor(private component: ButtonComponent) {
    this.component.circular = true;
  }
}