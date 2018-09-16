
import {trigger, transition, query, style, stagger, animate} from "@angular/animations";

export const listAnimation = trigger("listAnimation", [
  transition("* => *", [
    query(":enter", [
      style({
        opacity: 0,
        transform: "translateX(30px) scaleX(0.3) scaleY(0.5)",
        transformOrigin: "center 170%"
      }),
      stagger(100, [
        animate(".3s cubic-bezier(0,.83,.24,1)", style({
          opacity: 1,
          transform: "translateX(0) scale(1)",
          transformOrigin: "center 170%"
        }))
      ])
    ], {optional: true})
  ])
]);