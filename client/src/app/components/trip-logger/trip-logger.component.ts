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
  trip = {};
  photos = [];
  photoPreviews = [];
  fileReader: FileReader;

  constructor(
    private parkService: ParkService,
    private msgService: AlertService,
    private formBuilder: FormBuilder) {
    this.fileReader = new FileReader();
    this.fileReader.onload = (e) => {
      console.log(e);
    }
  }

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
          this.photoPreviews.push(e.target);
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
        // re-route user
      } else {
        this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
    }).catch(err => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Whoops! Something went wrong' });
    })
  }
}
