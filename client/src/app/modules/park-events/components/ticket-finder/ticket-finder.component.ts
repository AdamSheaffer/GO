import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { uniqBy } from 'lodash';
import { TicketQuery } from '../../../../shared/ticket-query.model';
import { EventService, AlertService } from '../../../core/services';
import { Event } from '../../../../shared/event.model';
import { Location } from '../../../../shared/location.model';
import { LocationService } from '../../services';

@Component({
  selector: 'app-ticket-finder',
  templateUrl: './ticket-finder.component.html',
  styleUrls: ['./ticket-finder.component.css']
})
export class TicketFinderComponent implements OnInit {

  meta;
  userLocation: Location;
  events: Event[] = [];
  homeTeams = []; // This is what gets passed to the Parks component
  form: FormGroup;
  queryParams = new TicketQuery();

  constructor(
    private eventService: EventService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private msgService: AlertService) {
    this.createForm();
  }

  ngOnInit() {
    this.locationService.getUserLocation((loc) => {
      this.userLocation = loc;
      this.queryParams.coords = loc;
    }, (err) => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Enable location services on your browser before using the Ticket Finder tool' });
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      radius: [50, Validators.compose([
        Validators.required
      ])],
      beginDate: ['', Validators.compose([
        Validators.required
      ])],
      endDate: ['', Validators.compose([
        Validators.required
      ])],
      minPrice: [null, Validators.min(1)],
      maxPrice: [null, Validators.min(1)],
    });
  }

  getEventsInRange() {
    const { radius, beginDate, endDate, minPrice, maxPrice } = this.form.getRawValue();
    this.queryParams.range = radius;
    this.queryParams.beginDate = beginDate;
    this.queryParams.endDate = endDate + 'T23:59Z';
    this.queryParams.minPrice = minPrice;
    this.queryParams.maxPrice = maxPrice;

    this.eventService.getEventsInRadius(this.queryParams).then(data => {
      this.events = data.events;
      this.meta = data.meta;
      this.homeTeams = this.getHomeTeamsOfEvents(this.events);
      this.msgService.show({ cssClass: 'alert-info', message: `Showing ${this.events.length} of ${data.meta.total} games found` });
    });
  }

  onQueryChange() {
    this.eventService.getEventsInRadius(this.queryParams).then(data => {
      this.events = data.events;
      this.meta = data.meta;
      this.homeTeams = this.getHomeTeamsOfEvents(this.events);
    });
  }

  getHomeTeamsOfEvents(events: Event[]) {
    const homeTeams = events.map(e => {
      return { team: e.performers.homeTeam, venue: e.venue };
    });
    return uniqBy(homeTeams, t => t.venue.id);
  }

  onParkSelect(park) {
    this.events.forEach(e => {
      if (e.venue.id === park.venue.id) {
        e.isActive = park.isActive;
      }
    });
  }

  onEventTicketSelect(event: Event) {
    // If it's active, make sure home team gets set to active
    if (event.isActive) {
      const team = this.homeTeams.find(t => t.venue.id === event.venue.id);
      team.isActive = true;
      return;
    }

    // If it's off check if there are others active before turning off hometeam
    const stillActive = this.events.find(e => e.venue.id === event.venue.id && e.isActive);
    if (stillActive) return;

    const team = this.homeTeams.find(t => t.venue.id === event.venue.id);
    team.isActive = false;
  }
}
