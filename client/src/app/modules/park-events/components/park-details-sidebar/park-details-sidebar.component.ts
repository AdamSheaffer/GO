import { Component, OnInit } from '@angular/core';
import { ParkService, AlertService } from '../../../core/services';
import { partition } from 'lodash';
import { Park } from '../../../../shared/park.model';

@Component({
  selector: 'app-park-details-sidebar',
  templateUrl: './park-details-sidebar.component.html',
  styleUrls: ['./park-details-sidebar.component.css']
})
export class ParkDetailsSidebarComponent implements OnInit {

  alTeamList: string[] = [];
  nlTeamList: string[] = [];

  constructor(private parkService: ParkService, private msgService: AlertService) { }

  ngOnInit() {
    this.getAllParks();
  }

  getAllParks() {
    this.parkService.getParks().then(data => {
      if (!data.success) {
        return this.msgService.show({ cssClass: 'alert-danger', message: data.message });
      }
      const [al, nl] = partition<Park>(data.parks, p => p.division.includes('American'));
      this.alTeamList = al.map(t => t.team).sort();
      this.nlTeamList = nl.map(t => t.team).sort();
    }).catch(err => {
      this.msgService.show({ cssClass: 'alert-danger', message: 'Whoops! Something went wrong finding your list of teams' });
    });
  }
}
