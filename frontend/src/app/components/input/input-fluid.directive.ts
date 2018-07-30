import { Directive } from '@angular/core';
import { InputComponent } from './input.component';

@Directive({
  selector: '[appInputFluid]'
})
export class InputFluidDirective {

  constructor(
    private component: InputComponent
  ) {
    this.component.fluid = true;
  }

}
