import { Directive } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Directive({ selector: 'app-button[fluid]' })
export class ButtonFluidDirective {
  constructor(
    private component: ButtonComponent
  ) {
    this.component.fluid = true;
  }
}