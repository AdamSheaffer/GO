import { Component, OnInit } from '@angular/core';
import { ParkService } from '../../services/park.service';
import { AlertService } from '../../services/alert.service';
import { Trip } from '../../shared/trip.model';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css']
})
export class UserTripsComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private parkService: ParkService, private msgService: AlertService) { }

  ngOnInit() {
    this.parkService.getUserTrips().then(data => {
      this.trips = data.trips;
      console.log(this.trips);
    }).catch(err => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Whoops! There was an error finding your trips' });
    });
  }

}
