import { Directive, Input, OnInit } from '@angular/core';
import { QuizComponent } from '../pages/quiz/quiz.component';

@Directive({ selector: '[keydown-enter]' })
export class QuizKeydownEnterDirective implements OnInit {

  @Input("keydown-enter") keydownEnter: QuizComponent;

  constructor() { }

  ngOnInit() {
    window.addEventListener("keydown", (e) => {
      const code = e.keyCode || e.which;
      if(code == 13) {
        if(this.keydownEnter.shown) this.keydownEnter.next();
      }
    }, false);
  }
}