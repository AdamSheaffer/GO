import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';

@Injectable()
export class ParkService {
  domain = "http://localhost:8080";

  constructor(private http: Http, private authService: AuthService) { }

  getParks() {
    return this.http.get(`${this.domain}/api/parks`).toPromise().then(res => res.json());
  }

  postTrip(trip: FormData) {
    const headers = this.authService.createMultipartAuthenticationHeaders();
    return this.http.post(`${this.domain}/api/trips`, trip, headers).toPromise().then(res => res.json());
  }
}
