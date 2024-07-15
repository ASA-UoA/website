import {Component, computed, inject} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {DatePipe, NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MarkdownComponent} from "ngx-markdown";
import {formatDistance} from "date-fns";

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
    return this.api.events().sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
  });
  protected readonly formatDistance = formatDistance;
  protected readonly Date = Date;
}

