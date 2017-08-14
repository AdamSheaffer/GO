import { Component, OnInit } from '@angular/core';
import { ParkService } from '../../services/park.service';
import { AlertService } from '../../services/alert.service';
import { Trip } from '../../shared/trip.model';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css']
})
export class UserTripsComponent implements OnInit {
  trips: Trip[] = [];
  tripStagedForDelete: Trip;
  deleteConfirmationModalContent: string;

  constructor(private parkService: ParkService, private msgService: AlertService) { }

  ngOnInit() {
    this.parkService.getUserTrips().then(data => {
      this.trips = this.sortTrips(data.trips);
    }).catch(err => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Whoops! There was an problem finding your trips' });
    });
  }

  deleteTrip() {
    this.parkService.deleteTrip(this.tripStagedForDelete._id).then(data => {
      if (data.success) {
        this.msgService.show({ cssClass: 'alert-success', message: data.message });
        this.removeTripWithId(this.tripStagedForDelete._id);
      } else {
        this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
      this.tripStagedForDelete = null;
    }).catch(err => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Whoops! There was a problem deleting that trip' });
      this.tripStagedForDelete = null;
    });
  }

  removeTripWithId(id) {
    this.trips = this.trips.filter(t => t._id !== id);
  }

  confirmDeleteTrip(trip: Trip) {
    this.tripStagedForDelete = trip;
    this.deleteConfirmationModalContent = `Delete your trip to ${trip.park.name}?`;
  }

  sortTrips(trips: Trip[]) {
    return sortBy(trips, t => new Date(t.tripDate));
  }
}
