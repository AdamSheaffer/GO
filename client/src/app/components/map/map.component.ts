import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../shared/event.model';
import { Location } from '../../shared/location.model';
import { } from '@types/google-maps';
import { groupBy } from 'lodash';
import { EventsByLocation } from "../../shared/events-by-location.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private _events: Event[];
  private _userLocation: Location;

  @Input()
  set events(events: Event[]) {
    this._events = events;
    this.updateMap(events);
  }

  get events() { return this._events }

  @Input()
  set userLocation(location: Location) {
    this._userLocation = location;
    this.setCenter(this._userLocation);
  }

  get userLocation() { return this._userLocation }

  map;
  markers = [];
  defaultCenter = { lat: 39.5, lon: -98.35 };

  constructor() {
  }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: (this.userLocation && this.userLocation.lat) || this.defaultCenter.lat,
        lng: (this.userLocation && this.userLocation.lon) || this.defaultCenter.lon
      },
      zoom: 4
    });
  }

  setMarkers(eventsByLocation: EventsByLocation[]) {
    if (!this.map) return; // This may get called before the map gets loaded

    this.clearMarkers();
    eventsByLocation.forEach(e => {
      const { lat, lon } = e.location;
      const marker = new google.maps.Marker({
        position: { lat, lng: lon },
        map: this.map,
        title: 'Test!'
      });
      this.markers.push(marker);
    });
  }

  clearMarkers() {
    this.markers.forEach(m => m.setMap(null));
  }

  setBounds(eventsByLocation: EventsByLocation[]) {
    if (!this.map || !eventsByLocation || !eventsByLocation.length) return; // This may get called before the map gets loaded

    const bounds = new google.maps.LatLngBounds();

    // extend to include starting location
    bounds.extend({
      lat: (this.userLocation && this.userLocation.lat) || this.defaultCenter.lat,
      lng: (this.userLocation && this.userLocation.lon) || this.defaultCenter.lon
    });

    eventsByLocation.forEach(e => {
      const { lat, lon } = e.location;
      bounds.extend({ lat: lat, lng: lon });
    });
    this.map.fitBounds(bounds);
  }

  setCenter(location: Location) {
    if (!this.map) return; // This may get called before the map gets loaded
    this.map.setCenter(new google.maps.LatLng(location.lat, location.lon));
  }


  groupEvents(events: Event[]): EventsByLocation[] {
    if (!events) return;

    const eventsByLocation: EventsByLocation[] = [];
    const groupedObj = groupBy(events, (e) => `${e.venue.location.lat},${e.venue.location.lon}`);

    for (let coords in groupedObj) {
      const [lat, lon] = coords.split(',').map(c => +c);
      eventsByLocation.push({
        location: { lat, lon },
        events: groupedObj[coords]
      });
    }

    return eventsByLocation;
  }

  updateMap(events: Event[]) {
    const eventsByLocation = this.groupEvents(events);
    this.setMarkers(eventsByLocation);
    this.setBounds(eventsByLocation);
  }

}
