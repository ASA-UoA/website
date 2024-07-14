import {Component, HostBinding, input} from '@angular/core';
import {Team} from "../../types/events";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-home-team-card',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './home-team-card.component.html',
  styles: ``
})
export class HomeTeamCardComponent {
  teamMember = input.required<Team>()
  @HostBinding('class') classes = 'text-center w-full sm:w-auto';
}
