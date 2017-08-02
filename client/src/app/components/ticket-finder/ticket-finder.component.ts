import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../shared/location.model';
import { Event } from '../../shared/event.model';

@Component({
  selector: 'app-ticket-finder',
  templateUrl: './ticket-finder.component.html',
  styleUrls: ['./ticket-finder.component.css']
})
export class TicketFinderComponent implements OnInit {

  userLocation: Location;
  events: Event[] = [];

  constructor(private eventService: EventService, private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getUserLocation((loc) => {
      this.userLocation = loc;
    })
  }

  getEventsInRange() {
    const miles = 300;
    const beginDate = '2017-08-01';
    const endDate = '2017-08-04';
    this.eventService.getEventsInRadius(this.userLocation, miles, beginDate, endDate).then(data => {
      this.events = data.events;
      console.log(this.events);
    });
  }
}
