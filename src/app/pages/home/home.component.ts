import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {PreloaderComponent} from "../../components/preloader/preloader.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    PreloaderComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
