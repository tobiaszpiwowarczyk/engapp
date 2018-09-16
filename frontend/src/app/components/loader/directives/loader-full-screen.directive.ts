import { LoaderComponent } from './../loader.component';
import { Directive } from '@angular/core';

@Directive({ selector: '[loaderFullScreen]' })
export class LoaderFullScreenDirective {
  constructor(
    private component: LoaderComponent
  ) {
    this.component.fullScreen = true;
  }
}