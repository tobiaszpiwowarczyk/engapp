import { FirstErrorPipe } from './pipes/first-error.pipe';
import { InputCompactDirective } from './directives/input-compact.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { InputComponent } from "./input.component";
import { InputFluidDirective } from './directives/input-fluid.directive';
import { LoaderModule } from '../loader/loader.module';


export const components: any[] = [
  InputComponent, InputFluidDirective, InputCompactDirective, FirstErrorPipe
];


@NgModule({
  imports: [CommonModule, FormsModule, LoaderModule],
  declarations: components,
  exports: components
})
export class InputModule { }
