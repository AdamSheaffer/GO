import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../../../../shared/trip.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-trips-map',
  templateUrl: './trips-map.component.html',
  styleUrls: ['./trips-map.component.css']
})
export class TripsMapComponent implements OnInit {
  private _trips: Trip[];
  private token = 'pk.eyJ1IjoiYWRhbXNoZWFmZmVyIiwiYSI6ImNqa2s1OWRieDA4emYzdnBiZnF1ZmU1b3AifQ.W6pXH3av-6y3UzRO8dAIMg';

  @Input()
  set trips(trips: Trip[]) {
    this._trips = trips;

    const path = trips.map(t => {
      const [lng, lat] = t.park.location.coordinates;
      return { lat, lng };
    });

    this.clearLines();
    this.drawLines(path);
    this.setBounds(path);
  }

  get trips() {
    return this._trips;
  }

  defaultCenter = { lat: 39.5, lon: -98.35 };
  map: L.Map;
  polyline: L.Polyline;

  constructor() { }

  ngOnInit() {
    this.map = L.map('map').setView([this.defaultCenter.lat, this.defaultCenter.lon], 4);
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

  drawLines(paths: { lat: number, lng: number }[]) {
    if (!this.map) { return; }

    const latlngs = paths.map(p => {
      return L.latLng(p.lat, p.lng);
    });

    this.polyline = L.polyline(latlngs, { color: '#ea5249' });
    this.polyline.addTo(this.map);
  }

  clearLines() {
    if (!this.map || !this.polyline) { return; }

    this.map.removeLayer(this.polyline);
  }

  setBounds(paths) {
    if (!this.map || !paths || !paths.length) { return; } // This may get called before the map gets loaded

    this.map.fitBounds(this.polyline.getBounds().pad(0.25));
  }
}
