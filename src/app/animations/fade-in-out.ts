import {animate, AnimationTriggerMetadata, style, transition, trigger} from "@angular/animations";

export function FadeInOut(timingIn: string, timingOut: string, height: boolean = false): AnimationTriggerMetadata {
  return trigger('fadeInOut', [
    transition(':enter', [
      style(height ? {opacity: 0, height: 0,} : {opacity: 0,}),
      animate(timingIn, style(height ? {opacity: 1, height: 'fit-content'} : {opacity: 1,})),
    ]),
    transition(':leave', [
      animate(timingOut, style(height ? {opacity: 0, height: 0,} : {opacity: 0,})),
    ])
  ]);
}
