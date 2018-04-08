import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { sortBy } from 'lodash';
import { ParkService, AlertService } from '../../../core/services';

@Component({
  selector: 'app-trip-logger',
  templateUrl: './trip-logger.component.html',
  styleUrls: ['./trip-logger.component.css']
})
export class TripLoggerComponent implements OnInit {
  parkParam: string;
  parks = [];
  trip;
  photos = [];
  photoPreviews = [];
  badges = [];
  activeBadgeIndex = 0;
  badgeTitle: string;
  badgeContent: string;
  isSaving: boolean;

  constructor(
    private parkService: ParkService,
    private msgService: AlertService,
    private router: Router,
    private route: ActivatedRoute) {
    this.trip = { rating: 1 };
    this.route.queryParamMap.subscribe(param => {
      this.parkParam = param.get('park') || null;
    });
  }

  ngOnInit() {
    this.parkService.getParks().then(data => {
      if (data.success) {
        this.parks = sortBy(data.parks, 'name');
        if (this.parkParam) {
          const defaultPark = this.parks.find(p => p.name === this.parkParam);
          this.trip.park = !!defaultPark ? defaultPark._id : null;
        }

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
    this.isSaving = true;

    const formData = new FormData();

    formData.append('trip', JSON.stringify(this.trip));

    this.photos.forEach(p => formData.append('photos', p));

    this.parkService.postTrip(formData).then(data => {
      this.isSaving = false;
      if (data.success) {
        this.msgService.show({ cssClass: 'alert-success', message: data.message });
        if (data.badges && data.badges.length) {
          this.badges = data.badges;
        } else {
          this.navigateToTrips();
        }
      } else {
        this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
    }).catch(err => {
      this.isSaving = false;
      this.msgService.show({ cssClass: 'alert-danger', message: 'Whoops! Something went wrong' });
    });
  }

  navigateToTrips() {
    this.router.navigate(['/trips']);
  }

  logNewTrip() {
    this.badges = [];
    this.activeBadgeIndex = 0;
    this.trip = { rating: 1 };
  }

}
