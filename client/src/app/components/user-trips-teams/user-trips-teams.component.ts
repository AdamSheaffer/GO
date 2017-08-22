import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../../shared/trip.model';
import { Park } from '../../shared/park.model';
import { partition } from 'lodash';

@Component({
  selector: 'app-user-trips-teams',
  templateUrl: './user-trips-teams.component.html',
  styleUrls: ['./user-trips-teams.component.css']
})
export class UserTripsTeamsComponent implements OnInit {
  private _trips: Trip[];

  @Input()
  set trips(trips: Trip[]) {
    this._trips = trips;
    if (trips && trips.length) {
      this.updateTeamsVisited(trips);
    }
  }

  get trips() {
    return this._trips;
  }

  @Input() parks: Park[];

  alTeamVisitedStatus = {};
  nlTeamVisitedStatus = {};
  alTeamNames: string[];
  nlTeamNames: string[];
  imageDir = '/assets/images/teams/';

  constructor(private router: Router) { }

  ngOnInit() {
    this.mapTeamsByDivision();
  }

  getDivisionalVisitedTeams(trips: Trip[], division: string) {
    return trips.filter(t => t.park.division.includes(division))
      .map(t => t.park.team);
  }

  mapTeamsByDivision() {
    this.parks.forEach(p => {
      const division = p.division.includes('National') ? this.nlTeamVisitedStatus : this.alTeamVisitedStatus;
      division[p.team] = {
        visited: false,
        image: `${this.imageDir}${p.team.replace(' ', '').toLocaleLowerCase()}.png`,
        park: p.name
      }
    });
    this.alTeamNames = Object.keys(this.alTeamVisitedStatus);
    this.nlTeamNames = Object.keys(this.nlTeamVisitedStatus);
  }

  updateTeamsVisited(trips: Trip[]) {
    this.getDivisionalVisitedTeams(trips, 'American').forEach(t => this.alTeamVisitedStatus[t].visited = true);
    this.getDivisionalVisitedTeams(trips, 'National').forEach(t => this.nlTeamVisitedStatus[t].visited = true);
  }

  onTeamSelect(team: string) {
    this.router.navigate(['/park', team]);
  }
}
