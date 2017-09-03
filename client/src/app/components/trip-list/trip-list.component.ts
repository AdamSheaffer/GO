import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from '../../shared/trip.model';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  @Input() trips: Trip[];
  @Output() onDeleteTrip = new EventEmitter<Trip>();

  get tripCount(): number { return !!this.trips ? this.trips.length : 0 }

  photoDir = 'http://localhost:8080/';
  showPhotoModal = false;
  selectedPhoto: string;
  perPage = 5;

  constructor() { }

  ngOnInit() {
  }

  selectPhoto(photo: string) {
    this.selectedPhoto = this.photoDir + photo;
    this.showPhotoModal = true;
  }

  deleteTrip(trip: Trip) {
    this.onDeleteTrip.emit(trip);
  }
}
