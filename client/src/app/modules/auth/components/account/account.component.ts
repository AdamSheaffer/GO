import { Component, OnInit } from '@angular/core';
import { AuthService, AlertService } from '../../../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private msgService: AlertService) {
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.form = this.formBuilder.group({
      email: [this.authService.user.email, Validators.compose([
        Validators.required,
        Validators.maxLength(40),
        this.validateEmail
      ])],
      name: [this.authService.user.name, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30)
      ])],
    });
  }

  validateEmail(controls) {
    // tslint:disable-next-line
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (regExp.test(controls.value)) {
      return null;
    }
    return { 'validateEmail': true };
  }

  updateUser() {
    const user = this.form.value;
    this.authService.updateAccount(user)
      .then(res => {
        const data = res.json();
        const cssClass = data.success ? 'alert-success' : 'alert-danger';
        this.msgService.show({ cssClass, message: data.message });
      })
      .catch(err => {
        this.msgService.show({
          cssClass: 'alert-danger',
          message: 'Whoops! Something unexpected happened while updating your account. Please try again'
        });
      });
  }
}
