import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isProcessing: boolean;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private msgService: AlertService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit() {
    this.isProcessing = true;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    const user = { email, password };

    this.authService.login(user).then(res => {
      const data = res.json();
      if (data.success) {
        this.msgService.show({ cssClass: 'alert-success', message: data.message });
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate([`${this.authService.redirectUrl || '/'}`]);
      } else {
        this.msgService.show({ message: data.message, cssClass: 'alert-danger' });
        this.isProcessing = false;
      }
    }).catch(err => {
      const message = err.status === 401 ? 'Invalid Email or Password' : 'Woops! something went wrong';
      this.msgService.show({ cssClass: 'alert-danger', message });
      this.isProcessing = false;
    });
  }
}
