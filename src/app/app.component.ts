import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ApiService} from "./services/api.service";
import {DatePipe} from "@angular/common";
import {PreloaderComponent} from "./components/preloader/preloader.component";
import {ErrorComponent} from "./components/error/error.component";
import {FadeInOut} from "./animations/fade-in-out";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FooterComponent} from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, PreloaderComponent, ErrorComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  animations: [FadeInOut('0ms', '500ms ease-out', false)]
})
export class AppComponent implements OnInit {
  // Deps
  api = inject(ApiService);

  ngOnInit(): void {
    this.api.updateData();
  }
}
