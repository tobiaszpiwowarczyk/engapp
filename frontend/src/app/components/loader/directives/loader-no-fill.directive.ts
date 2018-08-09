import { Directive } from '@angular/core';
import { LoaderComponent } from '../loader.component';

@Directive({
  selector: 'app-loader[appLoaderNoFill]'
})
export class LoaderNoFillDirective {

  constructor(
    private component: LoaderComponent
  ) {
    this.component.noFill = true;
  }

}
