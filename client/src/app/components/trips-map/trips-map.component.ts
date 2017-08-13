import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../../shared/trip.model';
import { sortBy } from 'lodash';
import { } from '@types/google-maps';

@Component({
  selector: 'app-trips-map',
  templateUrl: './trips-map.component.html',
  styleUrls: ['./trips-map.component.css']
})
export class TripsMapComponent implements OnInit {
  private _trips: Trip[];

  @Input()
  set trips(trips: Trip[]) {
    this._trips = sortBy(trips, 'tripDate');

    const path = trips.map(t => {
      const [lng, lat] = t.park.location.coordinates;
      return { lat, lng }
    });

    this.drawLines(path);
    this.setBounds(path);
  }

  get trips() {
    return this._trips;
  }

  defaultCenter = { lat: 39.5, lon: -98.35 };
  map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: this.defaultCenter.lat,
        lng: this.defaultCenter.lon
      },
      zoom: 4,
      styles: [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }, { "lightness": 33 }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#DFF0D0" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#c5dac6" }] }, { "featureType": "poi.park", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": 20 }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#c5c6c6" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#e4d7c6" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#fbfaf7" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#acbcc9" }] }]
    });
  }

  drawLines(path) {
    if (!this.map) return;

    const polyLines = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#EA5149',
      strokeOpacity: 0.6,
      strokeWeight: 2
    });

    polyLines.setMap(this.map);
  }

  setBounds(paths) {
    if (!this.map || !paths || !paths.length) return; // This may get called before the map gets loaded

    const bounds = new google.maps.LatLngBounds();
    paths.forEach(p => bounds.extend(p));
    this.map.fitBounds(bounds);
  }
}
