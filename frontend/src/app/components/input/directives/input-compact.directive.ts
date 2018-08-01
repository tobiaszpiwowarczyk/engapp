import { InputComponent } from '../input.component';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appInputCompact]'
})
export class InputCompactDirective {

  constructor(
    private component: InputComponent
  ) {
    this.component.compact = true;
  }

}
