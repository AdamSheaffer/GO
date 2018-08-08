import { Component, OnInit, Input } from '@angular/core';
import { groupBy } from 'lodash';
import { EventsByLocation } from '../../../../shared/events-by-location.model';
import { Location } from '../../../../shared/location.model';
import { Event } from '../../../../shared/event.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private _events: Event[];
  private _userLocation: Location;
  private token = 'pk.eyJ1IjoiYWRhbXNoZWFmZmVyIiwiYSI6ImNqa2s1OWRieDA4emYzdnBiZnF1ZmU1b3AifQ.W6pXH3av-6y3UzRO8dAIMg';
  map: L.Map;
  markers: L.Marker[] = [];
  defaultCenter = { lat: 39.5, lon: -98.35 };
  get events() { return this._events; }
  get userLocation() { return this._userLocation; }

  @Input()
  set events(events: Event[]) {
    this._events = events;
    this.updateMap(events);
  }

  @Input()
  set userLocation(location: Location) {
    this._userLocation = location;
    this.setCenter(this._userLocation);
  }

  constructor() {
  }

  ngOnInit() {
    const lat = (this.userLocation && this.userLocation.lat) || this.defaultCenter.lat;
    const lng = (this.userLocation && this.userLocation.lon) || this.defaultCenter.lon;
    const zoom = 4;
    this.map = L.map('map').setView([lat, lng], zoom);
    this.map.scrollWheelZoom.disable();

    L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${this.token}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
        'contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: this.token,
    }).addTo(this.map);
  }

  setMarkers(eventsByLocation: EventsByLocation[]) {
    if (!this.map) { return; } // This may get called before the map gets loaded

    this.clearMarkers();
    this.markers = eventsByLocation.map(e => {
      const { lat, lon } = e.location;
      const iconUrl = 'assets/images/009-location-sm.png';
      const marker = L.marker([lat, lon], {
        title: e.events[0].performers.homeTeam.name,
        icon: L.icon({ iconUrl })
      })
        .addTo(this.map)
        .bindPopup(this.setInfoWindowContent(e));

      return marker;

    });
  }

  clearMarkers() {
    this.markers.forEach(m => this.map.removeLayer(m));
  }

  setBounds(eventsByLocation: EventsByLocation[]) {
    if (!this.map || !eventsByLocation || !eventsByLocation.length) { return; } // This may get called before the map gets loaded

    const featureGroup = L.featureGroup(this.markers);
    this.map.fitBounds(featureGroup.getBounds().pad(0.25));
  }

  setCenter(location: Location) {
    if (!this.map) { return; } // This may get called before the map gets loaded
    this.map.panTo(L.latLng(location.lat, location.lon));
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
    if (!events) { return; }

    const eventsByLocation: EventsByLocation[] = [];
    const groupedObj = groupBy(events, (e) => `${e.venue.location.lat},${e.venue.location.lon}`);

    for (const coords in groupedObj) {
      if (groupedObj.hasOwnProperty(coords)) {
        const [lat, lon] = coords.split(',').map(c => +c);
        eventsByLocation.push({
          location: { lat, lon },
          events: groupedObj[coords]
        });
      }
    }

    return eventsByLocation;
  }

  updateMap(events: Event[]) {
    const eventsByLocation = this.groupEvents(events);
    this.setMarkers(eventsByLocation);
    this.setBounds(eventsByLocation);
  }

}
