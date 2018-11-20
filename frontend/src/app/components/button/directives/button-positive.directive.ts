import { Directive } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Directive({ selector: 'app-button[positive]' })
export class ButtonPositiveDirective {
  constructor(private component: ButtonComponent) {
    if(this.component.negative) {
      throw new Error("Przycisk posiada atrybut 'negative'");
    }

    this.component.positive = true;
  }
}