import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Location } from '../shared/location.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {
  domain = "http://localhost:8080";

  constructor(private http: Http) { }

  getEventsInRadius(coords: Location, range: Number, beginDate: String, endDate: String) {
    const { lat, lon } = coords;
    const args: RequestOptionsArgs = {
      params: { lat, lon, range, beginDate, endDate }
    }
    return this.http.get(`${this.domain}/api/range`, args).toPromise().then(res => res.json());
  }

}
