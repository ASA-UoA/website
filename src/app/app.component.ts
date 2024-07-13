import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ApiService} from "./services/api.service";
import {DatePipe} from "@angular/common";
import {PreloaderComponent} from "./components/preloader/preloader.component";
import {ErrorComponent} from "./components/error/error.component";
import {FadeInOut} from "./animations/fade-in-out";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, PreloaderComponent, ErrorComponent],
  templateUrl: './app.component.html',
  animations: [FadeInOut('0ms', '300ms ease-out', false)]
})
export class AppComponent implements OnInit {
  // Deps
  api = inject(ApiService);

  ngOnInit(): void {
    this.api.updateEvents();
  }
}
