import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SeatGeekPark } from '../../../../shared/seatgeek-park.model';

@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.css']
})
export class ParksComponent implements OnInit {
  @Input() parks: { team: Object, park: SeatGeekPark };
  @Output() onParkSelect = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectPark(park) {
    park.isActive = !park.isActive;
    this.onParkSelect.emit(park);
  }
}
