import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  trip = { rating: 1 };
  photos = [];
  photoPreviews = [];
  hasBadge = false;
  badgeTitle: string;
  badgeContent: string;

  constructor(
    private parkService: ParkService,
    private msgService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.parkService.getParks().then(data => {
      if (data.success) {
        this.parks = sortBy(data.parks, 'name');
      } else {
        this.msgService.show({ cssClass: 'alert-danger', message: 'Error getting list of parks. Please try again' });
      }
    });
  }

  onPhotoSelect(event) {
    const photos = event.target.files || event.srcElement.files;
    this.photos.push(...photos);
    this.readUrl(event.target)
  }

  readUrl(input) {
    if (input.files && input.files.length) {
      const files = Array.from(input.files);

      files.forEach((f: Blob) => {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          this.photoPreviews.push(e.target.result);
        }
        reader.readAsDataURL(f);
      });

    }
  }

  deletePhoto(index) {
    this.photos.splice(index, 1);
    this.photoPreviews.splice(index, 1);
  }

  submitTrip() {
    const formData = new FormData();

    formData.append('trip', JSON.stringify(this.trip));

    this.photos.forEach(p => formData.append('photos', p));

    this.parkService.postTrip(formData).then(data => {
      if (data.success) {
        this.msgService.show({ cssClass: 'alert-success', message: data.message });
        if (data.badge) {
          this.showBadge(data.badge);
        } else {
          this.router.navigate(['/trips']);
        }
      } else {
        this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
    }).catch(err => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Whoops! Something went wrong' });
    });
  }

  showBadge(badge) {
    this.hasBadge = true;
    this.badgeTitle = badge.title;
    this.badgeContent = badge.description;
  }

  navigateToTrips() {
    this.router.navigate(['/trips']);
  }

}
