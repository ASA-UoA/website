import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [],
  templateUrl: 'preloader.component.html'
})
export class PreloaderComponent {
  @HostBinding('class') class = 'h-full w-full absolute top-0 left-0 bg-red-500 grid place-items-center'
}
