import { AlertService, ParkService } from '../../modules/core/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sortBy } from 'lodash';
/* 
  I don't know if this should be refactored. This may be the rare case for inheritance.
  I started making the trip-logger.component
  also work for editing, but it became messy with photos. I'm making EDIT a separate 
  component for now, but using the original template and css from the logger.
*/


@Component({
  selector: 'app-trip-logger-edit',
  templateUrl: '../trip-logger/trip-logger.component.html',
  styleUrls: ['../trip-logger/trip-logger.component.css']
})
export class TripLoggerEditComponent implements OnInit {
  parks = [];
  trip;
  newPhotos = []; // New photos will be actual files. Old ones will be urls
  photoPreviews = [];
  badges = [];
  activeBadgeIndex = 0;
  badgeTitle: string;
  badgeContent: string;
  photoDir = '/uploads/';

  constructor(
    private parkService: ParkService,
    private msgService: AlertService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getParkList();
    this.getTrip();
  }

  getParkList() {
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
    this.newPhotos.push(...photos);
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

  getTrip() {
    const tripId = this.route.snapshot.params['id'];
    this.parkService.getUserTrip(tripId).then(data => {
      if (!data.success) {
        return this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
      this.trip = data.trip;
      this.trip.tripDate = data.trip.tripDate.substring(0, 10); // format date
      this.photoPreviews = this.trip.photos.map(p => this.photoDir + p)
    });
  }

  deletePhoto(index) {
    this.trip.photos.splice(index, 1);
    this.photoPreviews.splice(index, 1);
  }

  submitTrip() {
    const formData = new FormData();

    formData.append('trip', JSON.stringify(this.trip));

    this.newPhotos.forEach(p => formData.append('photos', p));

    this.parkService.updateTrip(formData).then(data => {
      if (data.success) {
        this.msgService.show({ cssClass: 'alert-success', message: data.message });
        this.router.navigate(['/trips']);
      } else {
        this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
    }).catch(err => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Whoops! Something went wrong' });
    });
  }

  navigateToTrips() {
    this.router.navigate(['/trips']);
  }

  logNewTrip() {
    this.badges = [];
    this.trip = { rating: 1 };
  }
}
