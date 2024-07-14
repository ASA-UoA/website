import {Component, computed, inject, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {PreloaderComponent} from "../../components/preloader/preloader.component";
import {ApiService} from "../../services/api.service";
import {CustomCountdownComponent} from "../../components/countdown/countdown.component";
import {DatePipe} from "@angular/common";
import {HomeTeamCardComponent} from "../../components/home-team-card/home-team-card.component";
import {MarkdownComponent} from "ngx-markdown";
import {differenceInSeconds} from "date-fns";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    PreloaderComponent,
    CustomCountdownComponent,
    DatePipe,
    HomeTeamCardComponent,
    MarkdownComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  api = inject(ApiService);

  upcomingEvents = computed(() => {
    const events = this.api.events();
    return events.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime()).filter((event) => event.dateTime.getTime() > Date.now()).slice(0, 3);
  });

  timeLeft = computed(() => {
    const event = this.upcomingEvents()[0];
    return event ? differenceInSeconds(event.dateTime, Date.now()) : 0;
  });

  today = signal(Date.now());

  president = computed(() => {
    return this.api.team().find((member) => member.role === 'President');
  });

  restOfTeam = computed(() => {
    return this.api.team().filter((member) => member.role !== 'President' && member.exec);
  });
}
