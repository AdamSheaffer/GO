import { Component, OnInit, Input } from '@angular/core';
import { Badge } from '../../shared/badge.model';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {
  @Input() badges: Badge[] = [];

  constructor() { }

  ngOnInit() {
  }

}
