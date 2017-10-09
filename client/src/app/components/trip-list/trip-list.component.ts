import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from '../../shared/trip.model';
import { orderBy } from 'lodash';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  private _trips: Trip[];

  @Input()
  set trips(trips: Trip[]) {
    this._trips = orderBy(trips, 'tripDate', 'desc');
  };
  get trips() {
    return this._trips;
  }

  @Output() onDeleteTrip = new EventEmitter<Trip>();

  get tripCount(): number { return !!this.trips ? this.trips.length : 0 }

  photoDir = '/uploads/';
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
