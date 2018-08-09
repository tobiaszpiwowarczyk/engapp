import { Directive } from '@angular/core';
import { LoaderComponent } from '../loader.component';

@Directive({
  selector: '[appLoaderTiny]'
})
export class LoaderTinyDirective {

  constructor(
    private component: LoaderComponent
  ) {
    this.component.loaderWidth = 40;
    this.component.tiny = true;
  }

}
