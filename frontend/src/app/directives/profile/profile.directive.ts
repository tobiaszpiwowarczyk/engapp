import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';
import { jarallax } from 'jarallax';

@Directive({ selector: '[profile]' })
export class ProfleDirective implements AfterContentInit {

  constructor(
    private el: ElementRef
  ) {}

  ngAfterContentInit(): void {
    const profile = this.el.nativeElement;

    if(!profile.className.includes("jarallax")) {
      profile.classList.add("jarallax");
    }

    if(!profile.querySelector("img").className.includes("jarallax-img")) {
      profile.querySelector("img").classList.add("jarallax-img");
    }

    jarallax(profile, {
      speed: 0.2,
      onScroll: e => profile.querySelector(".profile__background__filter").style.opacity = 1 - e.visiblePercent + 0.4
    });
  }
}