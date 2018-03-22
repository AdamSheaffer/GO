import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { get, sample, partition } from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { Park } from '../../../../shared/park.model';
import { TicketQuery } from '../../../../shared/ticket-query.model';
import { ParkService, AlertService } from '../../../core/services';

@Component({
  selector: 'app-park-details-home',
  templateUrl: './park-details-home.component.html',
  styleUrls: ['./park-details-home.component.css']
})
export class ParkDetailsHomeComponent implements OnInit {
  alTeamList: string[] = [];
  nlTeamList: string[] = [];
  selectedTeam: string;
  team$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private parkService: ParkService,
    private msgService: AlertService) {
  }

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
