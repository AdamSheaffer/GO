import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { AuthService } from '../auth/auth.service';


@Injectable()
export class ParkService {
  parksResponse;

  constructor(private http: Http, private authService: AuthService) { }

  getParks(): Promise<any> {
    if (this.parksResponse) return new Promise((res, rej) => res(this.parksResponse));
    return this.http.get(`api/parks`).toPromise().then(res => this.parksResponse = res.json());
  }

  getParkByTeam(teamName: string) {
    return this.http.get(`api/parks/${teamName}`).toPromise().then(res => res.json());
  }

  postTrip(trip: FormData) {
    const headers = this.authService.createMultipartAuthenticationHeaders();
    return this.http.post(`api/trips`, trip, headers).toPromise().then(res => res.json());
  }

  getUserTrips() {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.get(`api/trips`, headers).toPromise().then(res => res.json());
  }

  getUserTrip(tripId: string) {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.get(`api/trips/${tripId}`, headers).toPromise().then(res => res.json());
  }

  deleteTrip(tripId: string) {
    const headers = this.authService.createAuthenticationHeaders();
    return this.http.delete(`api/trips/${tripId}`, headers).toPromise().then(res => res.json());
  }

  updateTrip(trip: FormData) {
    const headers = this.authService.createMultipartAuthenticationHeaders();
    return this.http.put(`api/trips`, trip, headers).toPromise().then(res => res.json());
  }

  getBadges(userId: string) {
    const headers = this.authService.createMultipartAuthenticationHeaders();
    return this.http.get(`api/badges/${userId}`, headers).toPromise().then(res => res.json());
  }
}
