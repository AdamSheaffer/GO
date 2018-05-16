import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { get, sample, partition } from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { Park } from '../../../../shared/park.model';
import { TicketQuery } from '../../../../shared/ticket-query.model';
import { ParkService, AlertService, EventService } from '../../../core/services';
import { Event } from '../../../../shared/event.model';

@Component({
  selector: 'app-park-details',
  templateUrl: './park-details.component.html',
  styleUrls: ['./park-details.component.css']
})
export class ParkDetailsComponent implements OnInit, OnDestroy {
  park$: Subscription;
  teamName: string;
  teamImage: string;
  park: Park;
  events: Event[];
  upcomingEvents: number;
  queryParams = new TicketQuery();
  selectedPhotoIndex = 0;
  showPhotoModal = false;
  meta;
  photoDir = 'https://groundout.blob.core.windows.net/groundout/';

  constructor(
    private route: ActivatedRoute,
    private msgService: AlertService,
    private eventService: EventService) {
    this.resetQueryParams();
  }

  ngOnInit() {
    this.park$ = this.route.data.subscribe((data: { park: Park }) => {
      this.park = data.park;
      this.teamName = data.park.team;
      this.teamImage = `/assets/images/teams/${this.teamName.toLowerCase().replace(' ', '')}.png`;
      this.resetQueryParams();
      this.getTickets();
    });
  }

  resetQueryParams() {
    this.queryParams.page = 1;
    this.queryParams.sortBy = 'datetime_utc.asc';
  }

  getPark(teamName: string) {
    this.route.data.subscribe(data => {
      this.park = data.park;
      this.getTickets();
    });
  }

  getTickets() {
    this.eventService.getEventsForPark(this.park.name, this.queryParams.page, this.queryParams.sortBy).then(data => {
      if (!data.success) {
        return this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
      this.meta = data.meta;
      this.upcomingEvents = data.meta.total;
      this.events = data.events;
      const sampleEvent = sample(data.events);

    }).catch(err => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Something unexpected happened. Please try again' });
    });
  }

  selectPhoto(photoIndex: number) {
    this.selectedPhotoIndex = photoIndex;
    this.showPhotoModal = true;
  }

  showPrevPhoto() {
    if (this.selectedPhotoIndex < 1) { return; }
    this.selectedPhotoIndex--;
  }

  showNextPhoto() {
    if (!this.park || !this.park.photos || this.selectedPhotoIndex >= this.park.photos.length - 1) { return; }
    this.selectedPhotoIndex++;
  }

  ngOnDestroy() {
    if (this.park$) { this.park$.unsubscribe(); }
  }

}
