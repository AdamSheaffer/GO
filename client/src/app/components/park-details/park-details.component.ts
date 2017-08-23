import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParkService } from '../../services/park.service';
import { AlertService } from '../../services/alert.service';
import { Park } from '../../shared/park.model';
import { EventService } from '../../services/event.service';
import { Event } from '../../shared/event.model';
import { TicketQuery } from '../../shared/ticket-query.model';
import { get, sample } from 'lodash';

@Component({
  selector: 'app-park-details',
  templateUrl: './park-details.component.html',
  styleUrls: ['./park-details.component.css']
})
export class ParkDetailsComponent implements OnInit {
  teamName: string;
  teamImage: string;
  parkImage: string;
  park: Park;
  events: Event[];
  upcomingEvents: number;
  queryParams = new TicketQuery();
  photoDir = 'http://localhost:8080/';
  selectedPhotoIndex = 0;
  showPhotoModal = false;
  meta;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private parkService: ParkService,
    private msgService: AlertService,
    private eventService: EventService) {
    this.queryParams.page = 1;
    this.queryParams.sortBy = 'datetime_utc.asc';
  }

  ngOnInit() {
    this.teamName = this.route.snapshot.paramMap.get('team');
    this.teamImage = `/assets/images/teams/${this.teamName.toLowerCase().replace(' ', '')}.png`;
    this.getPark(this.teamName).then(() => this.getTickets());
  }

  getPark(teamName: string) {
    return this.parkService.getParkByTeam(teamName).then(data => {
      if (!data.success) {
        return this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
      this.park = data.park;
      this.teamName = `${this.park.teamCity} ${this.park.team}`;
    }).catch(err => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Something unexpected happened. Please try again' });
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
    if (this.selectedPhotoIndex < 1) return;
    this.selectedPhotoIndex--;
  }

  showNextPhoto() {
    if (!this.park || !this.park.photos || this.selectedPhotoIndex >= this.park.photos.length - 1) return;
    this.selectedPhotoIndex++;
  }

}
