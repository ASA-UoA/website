import {Component, computed, inject} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {HomeTeamCardComponent} from "../../components/home-team-card/home-team-card.component";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    HomeTeamCardComponent
  ],
  templateUrl: './team.component.html',
})
export class TeamComponent {

  api = inject(ApiService);

  executives = computed(() => {
    return this.api.team().filter(member => member.exec);
  });

  committee = computed(() => {
    return this.api.team().filter(member => !member.exec);
  });
}
