import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {TeamComponent} from "./pages/team/team.component";
import {EventsComponent} from "./pages/events/events.component";
import {EventComponent} from "./pages/events/event/event.component";
import {PastEventComponent} from "./pages/events/past/past.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'events/past',
    component: PastEventComponent,
  },
  {
    path: 'events/:eventId',
    component: EventComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
