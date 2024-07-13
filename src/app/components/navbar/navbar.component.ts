import {Component, HostBinding} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  @HostBinding('class') classes = 'fixed top-0 left-0 w-full z-50 bg-white shadow-md flex flex-row items-center gap-8 px-4 py-4';
}
