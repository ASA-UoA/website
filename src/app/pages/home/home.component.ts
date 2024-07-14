import {Component, computed, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {PreloaderComponent} from "../../components/preloader/preloader.component";
import {ApiService} from "../../services/api.service";
import {CustomCountdownComponent} from "../../components/countdown/countdown.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    PreloaderComponent,
    CustomCountdownComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  api = inject(ApiService);


  upcomingEvents = computed(() => {
    const events = this.api.events();
    console.log(Date.now(), events[events.length - 1].dateTime.getTime());
    return events.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime()).filter((event) => event.dateTime.getTime() > Date.now()).slice(0, 3);
  });

}
