import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
