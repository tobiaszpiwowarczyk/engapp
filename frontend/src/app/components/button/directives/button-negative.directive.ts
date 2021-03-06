import { Directive } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Directive({ selector: 'app-button[negative]' })
export class ButtonNegativeDirective {
  constructor(private component: ButtonComponent) {

    if(this.component.positive) {
      throw new Error("Przycisk posiada atrybut 'positive'");
    }

    this.component.negative = true;
  }
}