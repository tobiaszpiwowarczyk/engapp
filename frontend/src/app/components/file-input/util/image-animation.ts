import { animate, state, style, transition, trigger } from "@angular/animations";
import { defaultSettings } from "../../../animations/animations";

export const imageAnimation = trigger("imageAnimation", [
  state("in", style({
    opacity: 1,
    transform: "translateY(0) scale(1)",
    marginTop: "20px"
  })),
  transition(":enter", [
    style({
      opacity: 0,
      transform: "translateY(30px) scale(0)",
      transformOrigin: "center 170%",
      marginTop: 0
    }),
    animate(`400ms ${defaultSettings.bezier}`, style({
      opacity: 1,
      transform: "translateY(0) scale(1)",
      transformOrigin: "center 170%",
      marginTop: "20px"
    }))
  ]),
  transition(":leave", [
    animate(`400ms ${defaultSettings.bezier}`, style({
      opacity: 0,
      transform: "translateY(0) scale(0)",
      marginTop: 0
    }))
  ])
]);