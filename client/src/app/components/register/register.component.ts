import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    isProcessing: boolean;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm() {
        this.form = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(40),
                this.validateEmail
            ])],
            name: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(30)
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(35)
            ])],
            confirm: ['', Validators.required],
        }, { validator: this.matchingPasswords('password', 'confirm') });
    }

    validateEmail(controls) {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (regExp.test(controls.value)) {
            return null;
        }
        return { 'validateEmail': true };
    }

    matchingPasswords(password, confirm) {
        return (group: FormGroup) => {
            if (group.controls[password].value === group.controls[confirm].value) {
                return null;
            }
            return { matchingPasswords: true };
        }
    }

    onRegisterSubmit() {
        this.isProcessing = true;
        const user = ['name', 'email', 'password', 'confirm'].reduce((user, field) => {
            user[field] = this.form.get(field).value;
            return user;
        }, {});

        this.authService.registerUser(user).subscribe(data => {
            debugger;
            if (data.success) {
                //this.msgService.show(data.message, { cssClass: 'alert alert-success' });
                this.authService.storeUserData(data.token, data.user);
                this.router.navigate(['/']);
            } else {
                //this.msgService.show(data.message, { cssClass: 'alert alert-danger' });
                this.isProcessing = false;
            }
        });
    }

}
