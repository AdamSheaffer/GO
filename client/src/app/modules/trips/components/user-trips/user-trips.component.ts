import { Component, OnInit } from '@angular/core';
import { sortBy } from 'lodash';
import { Trip } from '../../../../shared/trip.model';
import { Park } from '../../../../shared/park.model';
import { Badge } from '../../../../shared/badge.model';
import { ParkService, AuthService, AlertService } from '../../../core/services';


@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css']
})
export class UserTripsComponent implements OnInit {
  hasFetchedTrips = false;
  trips: Trip[] = [];
  tripStagedForDelete: Trip;
  deleteConfirmationModalContent: string;
  parks: Park[] = [];
  badges: Badge[] = [];

  constructor(private parkService: ParkService, private authService: AuthService, private msgService: AlertService) { }

  ngOnInit() {
    this.getTrips();
    this.getParks();
    this.getBadges();
  }

  getTrips() {
    this.parkService.getUserTrips().then(data => {
      this.trips = this.sortTrips(data.trips);
      this.hasFetchedTrips = true;
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

  getParks() {
    this.parkService.getParks().then(data => {
      if (data.success) {
        this.parks = data.parks;
      }
    }).catch(err => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Whoops! There was a problem finding your park list' });
    });
  }

  getBadges() {
    const userId: string = this.authService.user && this.authService.user._id;
    if (!userId) return;
    this.parkService.getBadges(userId).then(data => {
      if (!data.success) {
        return this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
      this.badges = data.badges;
    }).catch(err => {
      return this.msgService.show({ cssClass: 'alert-danger', message: 'Whoops! There was a problem finding your badges' });
    });
  }
}
