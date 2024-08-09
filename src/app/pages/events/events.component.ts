import {Component, computed, inject} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {DatePipe, NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MarkdownComponent} from "ngx-markdown";
import {isFuture} from "date-fns";
import {EventCardComponent} from "../../components/event-card/event-card.component";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    MarkdownComponent,
    NgClass,
    EventCardComponent
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
}

