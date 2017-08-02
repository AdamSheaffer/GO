import { Injectable } from '@angular/core';
import { Location } from '../shared/location.model';

@Injectable()
export class LocationService {

  userPosition: Location;

  constructor() { }

  getUserLocation(fn: (location: Location) => void) {
    if (this.userPosition) {
      return fn(this.userPosition);
    }

    window.navigator.geolocation.getCurrentPosition((pos) => {
      this.userPosition = { lat: pos.coords.latitude, lon: pos.coords.longitude };
      fn(this.userPosition);
    });
  }

}
