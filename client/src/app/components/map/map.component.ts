import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../shared/event.model';
import { Location } from '../../shared/location.model';
import { } from '@types/google-maps';
import { groupBy } from 'lodash';
import { EventsByLocation } from '../../shared/events-by-location.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private _events: Event[];
  private _userLocation: Location;

  infoWindow = new google.maps.InfoWindow();

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
      zoom: 4,
      styles: [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }, { "lightness": 33 }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#DFF0D0" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#c5dac6" }] }, { "featureType": "poi.park", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": 20 }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#c5c6c6" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#e4d7c6" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#fbfaf7" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#acbcc9" }] }]
    });

    this.infoWindow = new google.maps.InfoWindow({ content: 'Test' });
  }

  setMarkers(eventsByLocation: EventsByLocation[]) {
    if (!this.map) return; // This may get called before the map gets loaded

    this.clearMarkers();
    this.markers = eventsByLocation.map(e => {
      const { lat, lon } = e.location;
      const icon = 'assets/images/009-location-sm.png';
      const marker = new google.maps.Marker({
        position: { lat, lng: lon },
        map: this.map,
        title: 'Test!',
        icon
      });

      marker.addListener('click', () => {
        this.infoWindow.setContent(this.setInfoWindowContent(e));
        this.infoWindow.open(this.map, marker);
      });

      return marker;

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

  setInfoWindowContent(eventsByLocation: EventsByLocation) {
    const events = eventsByLocation.events;
    const homeTeam = events[0].performers.homeTeam;
    const dates = this.buildDateString(events);

    return `
      <h5 id="firstHeading" class="firstHeading">${events[0].venue.name}</h5>
      <div>
        <b>Team:</b> ${homeTeam.name}
      </div>
      <div>
        <b> Dates: </b> ${dates}
      </div>
      <hr />
      <br />
      <img src="${homeTeam.image}" />`;
  }

  buildDateString(events: Event[]) {
    const months = 'Jan Feb Mar Apr May Jun Jul Aug Sept Oct Nov Dec'.split(' ');
    return events.reduce((dateStr, e, i) => {
      if (i > 0) {
        dateStr += ', ';
      }
      const date = new Date(e.datetime_local);
      const month = months[date.getMonth()];
      const day = date.getDate();

      return dateStr += `${month} ${day}`;
    }, '');
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
