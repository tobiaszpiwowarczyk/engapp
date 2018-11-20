import { NgModule } from '@angular/core';
import { TextAreaDirective } from './text-area.directive';

@NgModule({
  exports: [TextAreaDirective],
  declarations: [TextAreaDirective]
})
export class TextAreaModule { }
