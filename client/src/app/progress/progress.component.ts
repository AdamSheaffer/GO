import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../shared/trip.model';
import { Park } from '../shared/park.model';
import { partition, uniq } from 'lodash';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  private _trips: Trip[];

  @Input() parks: Park[];

  @Input()
  set trips(trips: Trip[]) {
    this._trips = trips;
  }

  get trips() { return this._trips }

  totalPercentage: number = 50;
  nlPercentage: number = 60;
  alPercentage: number = 80;

  constructor() { }

  ngOnInit() {
  }

  calculateProgress() {
    const [alParks, nlParks] = partition(this.parks, p => p.division.includes('American'));
    const visitedParks = uniq(this.trips.map(t => t.park));
    const visitedALParks = alParks.filter(p => visitedParks.includes(p.name));
    const visitedNLParks = nlParks.filter(p => visitedParks.includes(p.name));
    const totalParkCount = alParks.length + nlParks.length;
    this.totalPercentage = (totalParkCount / visitedParks.length) * 100;
    this.alPercentage = (alParks.length / visitedALParks.length) * 100;
    this.nlPercentage = (nlParks.length / visitedNLParks.length) * 100;
  }

}
