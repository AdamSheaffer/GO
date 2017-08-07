import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkService } from '../../services/park.service';
import { AlertService } from '../../services/alert.service';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-trip-logger',
  templateUrl: './trip-logger.component.html',
  styleUrls: ['./trip-logger.component.css']
})
export class TripLoggerComponent implements OnInit {

  parks = [];
  form: FormGroup;

  constructor(
    private parkService: ParkService,
    private msgService: AlertService,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.parkService.getParks().then(data => {
      if (data.success) {
        this.parks = sortBy(data.parks, 'name');
      } else {
        this.msgService.show({ cssClass: 'alert-danger', message: 'Error getting list of parks. Please try again' });
      }
    });

    this.form.controls['park'].valueChanges.subscribe((parkId: string) => {
      const park = this.parks.find(p => p._id === parkId);
      console.log(park);
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      tripDate: [null, Validators.required],
      park: [null, Validators.required],
      comments: [null],
      rating: [1, Validators.required]
    });
  }

  submitTrip() {
    const trip = this.form.getRawValue();
    this.parkService.postTrip(trip).then(data => {
      if (data.success) {
        this.msgService.show({ cssClass: 'alert-success', message: data.message });
        // re-route user
      } else {
        this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
    });
  }
}
