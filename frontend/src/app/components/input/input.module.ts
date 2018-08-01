import { InputCompactDirective } from './directives/input-compact.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { InputComponent } from "./input.component";
import { InputFluidDirective } from './directives/input-fluid.directive';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InputComponent, InputFluidDirective, InputCompactDirective],
  exports: [InputComponent, InputFluidDirective, InputCompactDirective]
})
export class InputModule { }
