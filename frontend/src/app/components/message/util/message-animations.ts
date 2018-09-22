import { trigger, style, animate, AnimationTriggerMetadata, transition, state } from '@angular/animations';

export const MESSAGE_ANIMATION_TIME: number = 400;
export const PROGRESS_ANIMATION_TIME: number = 3000;
export const BEZIER: string = "cubic-bezier(0,.83,.24,1)";

export const MESSAGE_SHOWN = "MESSAGE_SHOWN";
export const MESSAGE_HIDDEN = "MESSAGE_HIDDEN";

export const PROGRESS_INITIAL = "PROGRESS_INITIAL";
export const PROGRESS_LOADING = "PROGRESS_LOADING";



export const messageAnimation: AnimationTriggerMetadata = trigger("messageAnimation", [
  state(MESSAGE_HIDDEN, style({
    opacity: 0,
    transform: "translateY(50px) scale(0.4)"
  })),
  state(MESSAGE_SHOWN, style({
    opacity: 1,
    transform: "translateY(0) scale(1)"
  })),
  transition(`${MESSAGE_HIDDEN} <=> ${MESSAGE_SHOWN}`, animate(`${MESSAGE_ANIMATION_TIME}ms ${BEZIER}`))
]);



export const messageProgressAnimation: AnimationTriggerMetadata = trigger("messageProgressAnimation", [
  state(PROGRESS_INITIAL, style({width: "0%"})),
  state(PROGRESS_LOADING, style({width: "100%"})),
  transition(`${PROGRESS_INITIAL} => ${PROGRESS_LOADING}`, animate(PROGRESS_ANIMATION_TIME))
]);