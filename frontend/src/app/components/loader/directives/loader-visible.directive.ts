import { Directive, Input } from '@angular/core';
import { LoaderComponent } from '../loader.component';

@Directive({ selector: '[loaderVisible]' })
export class LoaderVisibleDirective {
  constructor(
    private component: LoaderComponent
  ) {
    this.component.visible = true;
  }
}