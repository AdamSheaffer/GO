import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AlertService } from '../../modules/core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  constructor(
    private authService: AuthService,
    private msgService: AlertService,
    private router: Router) { }

  ngOnInit() {
    if (!this.authService.user) {
      this.authService.loadUser();
    }
  }

  logout() {
    this.authService.logout();
    this.msgService.show({ cssClass: 'alert alert-info', message: 'You are now logged out' });
    this.router.navigate(['/']);
  }
}
