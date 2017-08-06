import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-logger',
  templateUrl: './trip-logger.component.html',
  styleUrls: ['./trip-logger.component.css']
})
export class TripLoggerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('hello');
  }

}
