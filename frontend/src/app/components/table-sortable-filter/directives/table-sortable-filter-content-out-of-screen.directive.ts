import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: '[out-of-screen]' })
export class TableSortableFilterOutOfScreenDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const position = this.el.nativeElement.getBoundingClientRect();
    if(position.x < 0) {
      this.el.nativeElement.style.left = 0;
    }
  }
}