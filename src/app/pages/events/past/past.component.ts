import {Component, computed, inject} from '@angular/core';
import {EventCardComponent} from "../../../components/event-card/event-card.component";
import {ApiService} from "../../../services/api.service";
import {isPast} from "date-fns";
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  imports: [
    EventCardComponent,
    RouterLink
  ],
  templateUrl: './past.component.html',
  styles: ``
})
export class PastEventComponent {
  api = inject(ApiService);

  sortedEvents = computed(() => {
    const sorted = this.api.events().sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());
    // only show events that are in the future
    return sorted.filter(event => isPast(event.dateTime));
  });
}
