import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    authToken: string;
    user: any;

    constructor(private http: Http) { }

    createAuthenticationHeaders<RequestOptions>() {
        this.loadToken();
        return new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: this.authToken
            })
        });
    }

    createMultipartAuthenticationHeaders<RequestOptions>() {
        this.loadToken();
        const headers = new Headers();
        headers.set('Accept', 'application/json');
        headers.set('authorization', this.authToken);
        return new RequestOptions({ headers: headers });
    }

    loadToken() {
        this.authToken = localStorage.getItem('token');
    }

    loadUser() {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    registerUser(user) {
        return this.http.post('auth/register', user).toPromise();
    }

    login(user) {
        return this.http.post('auth/login', user).toPromise();
    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }

    isLoggedIn() {
        return tokenNotExpired();
    }

    storeUserData(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }
}