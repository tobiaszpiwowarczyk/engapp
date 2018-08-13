import { LoaderTinyDirective } from './directives/loader-tiny.directive';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader.component';
import { CommonModule } from '@angular/common';
import { LoaderNoFillDirective } from './directives/loader-no-fill.directive';

@NgModule({
  imports: [CommonModule],
  exports: [LoaderComponent, LoaderTinyDirective, LoaderNoFillDirective],
  declarations: [LoaderComponent, LoaderTinyDirective, LoaderNoFillDirective],
})
export class LoaderModule { }
