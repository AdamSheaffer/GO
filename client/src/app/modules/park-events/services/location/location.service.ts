import { Injectable } from '@angular/core';
import { Location } from '../../../../shared/location.model';


@Injectable()
export class LocationService {

  userPosition: Location;

  constructor() { }

  getUserLocation(onSuccess: (location: Location) => void, onError: (err) => void) {
    if (this.userPosition) {
      return onSuccess(this.userPosition);
    }

    window.navigator.geolocation.getCurrentPosition((pos) => {
      this.userPosition = { lat: pos.coords.latitude, lon: pos.coords.longitude };
      onSuccess(this.userPosition);
    }, onError);
  }

}
