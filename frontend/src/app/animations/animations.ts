
import {trigger, transition, query, style, stagger, animate, animateChild} from "@angular/animations";

export const listAnimation = trigger("listAnimation", [
  transition("* => *", [
    query("@listItemAnimation", stagger(100, animateChild()), {optional: true})
  ])
]);


export const listItemAnimation = trigger("listItemAnimation", [
  transition(":enter", [
    style({
      opacity: 0,
      transform: "translateX(30px) scaleX(0.3) scaleY(0.5)",
      transformOrigin: "center 170%"
    }),
    animate(".3s cubic-bezier(0,.83,.24,1)", style({
      opacity: 1,
      transform: "translateX(0) scale(1)",
      transformOrigin: "center 170%"
    }))
  ])
]);