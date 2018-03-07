import { Component, OnInit } from '@angular/core';
import { Alert } from '../../../../shared/alert.model';
import { AlertService } from '../../services';


@Component({
  selector: 'app-flash',
  templateUrl: './app-flash.component.html',
  styleUrls: ['./app-flash.component.css']
})
export class AppFlashComponent implements OnInit {

  alerts: Alert[];

  constructor(private alertService: AlertService) {
    this.alerts = alertService.alerts;
  }

  ngOnInit() {
  }

  close(alert: Alert) {
    this.alertService.remove(alert);
  }
}
