import {Component, HostBinding} from '@angular/core';
import {SpinnerComponent} from "../spinner/spinner.component";

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [
    SpinnerComponent
  ],
  templateUrl: 'preloader.component.html'
})
export class PreloaderComponent {
  @HostBinding('class') class = 'h-full w-full absolute top-0 left-0 bg-black grid place-items-center'
}
