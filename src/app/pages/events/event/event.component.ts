import {Component, computed, inject, input} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './event.component.html',
})
export class EventComponent {
  api = inject(ApiService);

  eventId = input.required<string>()
  event = computed(() => {
    return this.api.events().find(e => e.id === this.eventId())
  })

}
