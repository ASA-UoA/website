import {Component, computed, inject} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './events.component.html',
})
export class EventsComponent {
  api = inject(ApiService);

  sortedEvents = computed(() => {
    return this.api.events().sort((a, b) => a.dateTime.getDate() - b.dateTime.getDate())
  });
}
