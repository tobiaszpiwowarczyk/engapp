import { ErrorReportWidgetComponent } from './../error-report-widget.component';
import { Directive, HostListener } from '@angular/core';
import { EventTargetUtils } from '../../../util/EventTargetUtils';

@Directive({ selector: '[errorWidgetForm]' })
export class ErrorWidgetFormDirective {

  constructor(private c: ErrorReportWidgetComponent) { }

  @HostListener("window:click", ["$event"])
  public windowHideWidget(e: MouseEvent): void {
    if(this.c.widgetShown && (!EventTargetUtils.reachedTarget(e, "error-report-btn") &&
      !EventTargetUtils.reachedTarget(e, "error-report-widget__form"))) this.c.hideWidget();
  }


  @HostListener("window:keyup", ["$event"])
  public hideWidgetOnKeyUp(e: KeyboardEvent) {
    const key: number = e.keyCode || e.which;
    if(this.c.widgetShown && key == 27) {
      this.c.hideWidget();
    }
  }

}