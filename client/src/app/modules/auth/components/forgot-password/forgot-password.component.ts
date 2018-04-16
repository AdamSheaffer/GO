import { Component, OnInit } from '@angular/core';
import { AuthService, AlertService } from '../../../core/services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  isLoading: boolean;
  successMessage: string;

  constructor(private authService: AuthService, private msgService: AlertService) { }

  ngOnInit() {
  }

  submitReset() {
    this.isLoading = true;
    this.authService.requestResetEmail(this.email)
      .then(res => {
        this.isLoading = false;
        const data = res.json();
        if (data.success) {
          this.successMessage = data.message;
        } else {
          this.msgService.show({ cssClass: 'alert-danger', message: data.message });
        }
      })
      .catch(err => {
        this.isLoading = false;
        this.msgService.show({ cssClass: 'alert-danger', message: 'Whoops! Something went wrong while trying to email your reset link. Please try again' });
      });
  }

}
