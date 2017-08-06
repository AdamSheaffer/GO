import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Park } from '../../shared/park.model';

@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.css']
})
export class ParksComponent implements OnInit {
  @Input() parks: { team: Object, park: Park };
  @Output() onParkSelect = new EventEmitter<Object>()

  constructor() { }

  ngOnInit() {
  }

  selectPark(park) {
    park.isActive = !park.isActive;
    this.onParkSelect.emit(park);
  }
}
