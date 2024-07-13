import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ApiService} from "./services/api.service";
import {DatePipe, JsonPipe} from "@angular/common";
import {PreloaderComponent} from "./components/preloader/preloader.component";
import {ErrorComponent} from "./components/error/error.component";
import {FadeInOut} from "./animations/fade-in-out";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, PreloaderComponent, ErrorComponent, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [FadeInOut(200, 300, true)]
})
export class AppComponent implements OnInit {
  // Deps
  api = inject(ApiService);

  ngOnInit(): void {
    this.api.updateEvents();
  }
}
