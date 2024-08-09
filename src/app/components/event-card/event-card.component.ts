import {Component, input} from '@angular/core';
import {formatDistanceToNow, isFuture} from "date-fns";
import {DatePipe, NgClass} from "@angular/common";
import {MarkdownComponent} from "ngx-markdown";
import {Event} from "../../types/events";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [
    DatePipe,
    MarkdownComponent,
    RouterLink,
    NgClass
  ],
  templateUrl: './event-card.component.html',
  styles: ``
})
export class EventCardComponent {
  event = input.required<Event>();
  even = input<boolean>();

  protected readonly formatDistanceToNow = formatDistanceToNow;
  protected readonly isFuture = isFuture;
}
