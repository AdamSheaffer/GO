import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    public authService: AuthService,
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