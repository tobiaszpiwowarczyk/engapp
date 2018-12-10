
import { trigger, transition, query, style, stagger, animate, animateChild } from "@angular/animations";


interface AnimationData {
  time: number;
  shownState: { [key: string]: string | number };
  hiddenState: { [key: string]: string | number };
}

interface AnimationDataConfig {
  item: AnimationData;
  progress: AnimationData;
  bezier: string;
}

export const defaultSettings: AnimationDataConfig = {
  item: {
    time: 400,
    shownState: {
      opacity: 1,
      transform: "translateX(0) scale(1)",
      transformOrigin: "center 170%",
      height: "*"
    },
    hiddenState: {
      opacity: 0,
      transform: "translateX(30px) scaleX(0.3) scaleY(0.5)",
      transformOrigin: "center 170%",
      height: "0px"
    }
  },
  progress: {
    time: 3000,
    shownState: { width: "100%" },
    hiddenState: { width: "0%" }
  },
  bezier: "cubic-bezier(0,.83,.24,1)"
};




export const listAnimation = trigger("listAnimation", [
  transition("* => *", [
    query("@listItemAnimation", stagger(100, animateChild()), { optional: true }),
    query("@itemAnimation", stagger(100, animateChild()), { optional: true }),
  ])
]);


export const itemAnimation = trigger("itemAnimation", [
  transition(":enter", [
    style(defaultSettings.item.hiddenState),
    animate(`${defaultSettings.item.time}ms ${defaultSettings.bezier}`, style(defaultSettings.item.shownState))
  ]),
  transition(":leave", [
    style(defaultSettings.item.shownState),
    animate(`${defaultSettings.item.time}ms ${defaultSettings.bezier}`, style(defaultSettings.item.hiddenState))
  ])
]);

export const listItemAnimation = trigger("listItemAnimation", [
  transition(":enter", [
    style(defaultSettings.item.hiddenState),
    animate(`${defaultSettings.item.time}ms ${defaultSettings.bezier}`, style(defaultSettings.item.shownState))
  ])
]);