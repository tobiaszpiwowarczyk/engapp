import { ButtonPrimaryDirective } from './directives/button-primary.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { ButtonCircularDirective } from './directives/button-circular.directive';
import { ButtonFluidDirective } from './directives/button-fluid.directive';
import { ButtonIconDirective } from './directives/button-icon.directive';
import { ButtonNegativeDirective } from './directives/button-negative.directive';
import { ButtonDisabledDirective } from './directives/button-disabled.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonComponent,
    ButtonFluidDirective,
    ButtonIconDirective,
    ButtonCircularDirective,
    ButtonNegativeDirective,
    ButtonPrimaryDirective,
    ButtonDisabledDirective
  ],
  exports: [
    ButtonComponent,
    ButtonFluidDirective,
    ButtonIconDirective,
    ButtonCircularDirective,
    ButtonNegativeDirective,
    ButtonPrimaryDirective,
    ButtonDisabledDirective
  ]
})
export class ButtonModule { }
