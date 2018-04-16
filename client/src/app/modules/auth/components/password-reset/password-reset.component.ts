import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, AlertService } from '../../../core/services';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  token: string;
  password: string;
  passwordConfirm: string;
  isLoading: boolean;
  validationError: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private msgService: AlertService) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.verifyToken(this.token);
  }

  verifyToken(token: string) {
    this.authService.verifyResetToken(token)
      .then(res => {
        const data = res.json();
        if (!data.success) {
          this.validationError = data.message;
          this.msgService.show({ cssClass: 'alert-danger', message: data.message });
        }
      });
  }

  resetPassword() {
    this.isLoading = true;
    this.authService.updatePassword(this.token, this.password, this.passwordConfirm)
      .then(res => {
        this.isLoading = false;
        const data = res.json();
        if (!data.success) {
          return this.msgService.show({ cssClass: 'alert-danger', message: data.message });
        }
        this.msgService.show({ cssClass: 'alert-success', message: data.message });
        this.router.navigate(['/auth/login']);
      })
      .catch(err => {
        this.isLoading = false;
        return this.msgService.show({
          cssClass: 'alert-danger',
          message: 'Whoops! Something unexpected went wrong while updating your password. Please try again'
        });
      });
  }

}
