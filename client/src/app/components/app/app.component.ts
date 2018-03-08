import { Component } from '@angular/core';
import { ClrAlertModule } from 'clarity-angular'
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }

  get isHomeRoute() {
    return this.router.url === '/';
  }

  get isTicketRoute() {
    return this.router.url.startsWith('/events/');
  }
}
