import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../shared/location.model';
import { Event } from '../../shared/event.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-ticket-finder',
  templateUrl: './ticket-finder.component.html',
  styleUrls: ['./ticket-finder.component.css']
})
export class TicketFinderComponent implements OnInit {

  userLocation: Location;
  events: Event[] = [];
  form: FormGroup;

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
    })
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
      maxPrice: [null, Validators.min(1)],
    });
  }

  getEventsInRange() {
    const { radius, beginDate, endDate, maxPrice } = this.form.getRawValue();
    this.eventService.getEventsInRadius(this.userLocation, radius, beginDate, endDate).then(data => {
      this.events = data.events;
      this.msgService.show({ cssClass: 'alert-info', message: `${this.events.length} games found` });
      console.log(this.events);
    });
  }
}
