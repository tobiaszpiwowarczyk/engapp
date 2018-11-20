import { AfterContentInit, Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[appTextArea]' })
export class TextAreaDirective implements AfterContentInit {

  private static readonly FOCUSED = "textarea--focused";

  constructor(
    private el: ElementRef
  ) { }

  ngAfterContentInit(): void {
    this.el.nativeElement.querySelector("textarea").addEventListener("focus", this.focus.bind(this), false);
    this.el.nativeElement.querySelector("textarea").addEventListener("blur", this.blur.bind(this), false);
  }


  private focus = (): void => this.el.nativeElement.classList.add(TextAreaDirective.FOCUSED);
  private blur = (): void => this.el.nativeElement.classList.remove(TextAreaDirective.FOCUSED);

}