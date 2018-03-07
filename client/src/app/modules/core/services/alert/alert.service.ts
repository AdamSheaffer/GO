import { Injectable } from '@angular/core';
import { Alert } from '../../../../shared/alert.model';


@Injectable()
export class AlertService {

  alerts: Alert[] = [];

  constructor() { }

  show(alert: Alert) {
    this.alerts.push(alert);
    setTimeout(() => {
      this.remove(alert);
    }, 2500);
  }

  remove(alert: Alert) {
    const index = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
