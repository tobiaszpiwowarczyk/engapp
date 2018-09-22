import { LoaderFullScreenDirective } from './directives/loader-full-screen.directive';
import { LoaderTinyDirective } from './directives/loader-tiny.directive';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader.component';
import { CommonModule } from '@angular/common';
import { LoaderNoFillDirective } from './directives/loader-no-fill.directive';
import { LoaderVisibleDirective } from './directives/loader-visible.directive';

@NgModule({
  imports: [CommonModule],
  exports: [LoaderComponent, LoaderTinyDirective,
    LoaderNoFillDirective, LoaderVisibleDirective, LoaderFullScreenDirective],
  declarations: [LoaderComponent, LoaderTinyDirective,
    LoaderNoFillDirective, LoaderVisibleDirective, LoaderFullScreenDirective],
})
export class LoaderModule { }
