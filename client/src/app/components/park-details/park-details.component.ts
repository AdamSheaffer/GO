import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParkService } from '../../services/park.service';
import { AlertService } from '../../services/alert.service';
import { Park } from '../../shared/park.model';
import { EventService } from '../../services/event.service';
import { Event } from '../../shared/event.model';
import { TicketQuery } from '../../shared/ticket-query.model';

@Component({
  selector: 'app-park-details',
  templateUrl: './park-details.component.html',
  styleUrls: ['./park-details.component.css']
})
export class ParkDetailsComponent implements OnInit {
  teamName: string;
  park: Park;
  events: Event[];
  queryParams = new TicketQuery();
  meta;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private parkService: ParkService,
    private msgService: AlertService,
    private eventService: EventService) {
    this.queryParams.page = 1;
  }

  ngOnInit() {
    this.teamName = this.route.snapshot.paramMap.get('team');
    this.getPark(this.teamName).then(() => this.getTickets());
  }

  getPark(teamName: string) {
    return this.parkService.getParkByTeam(teamName).then(data => {
      if (!data.success) {
        return this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
      this.park = data.park;
    }).catch(err => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Something unexpected happened. Please try again' });
    });
  }

  getTickets() {
    this.eventService.getEventsForPark(this.park.name).then(data => {
      if (!data.success) {
        return this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
      this.meta = data.meta;
      this.events = data.events;
      console.log(this.meta, this.events);
    }).catch(err => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Something unexpected happened. Please try again' });
    });
  }

}
