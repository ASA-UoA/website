import {Component, computed, inject} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {DatePipe, NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MarkdownComponent} from "ngx-markdown";
import {formatDistanceToNow, isFuture} from "date-fns";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    MarkdownComponent,
    NgClass
  ],
  templateUrl: './events.component.html',
})
export class EventsComponent {
  api = inject(ApiService);

  sortedEvents = computed(() => {
    const sorted = this.api.events().sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
    // only show events that are in the future
    return sorted.filter(event => isFuture(event.dateTime));
  });

  protected readonly formatDistanceToNow = formatDistanceToNow;
}

