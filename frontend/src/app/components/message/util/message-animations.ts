import { trigger, style, animate, AnimationTriggerMetadata, transition, state } from '@angular/animations';
import { defaultSettings } from '../../../animations/animations';

export const PROGRESS_INITIAL = "PROGRESS_INITIAL";
export const PROGRESS_LOADING = "PROGRESS_LOADING";



export const messageProgressAnimation: AnimationTriggerMetadata = trigger("messageProgressAnimation", [
  state(PROGRESS_INITIAL, style(defaultSettings.progress.hiddenState)),
  state(PROGRESS_LOADING, style(defaultSettings.progress.shownState)),
  transition(`${PROGRESS_INITIAL} => ${PROGRESS_LOADING}`, animate(defaultSettings.progress.time))
]);