import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { partition } from 'lodash';
import { Trip } from '../../../../shared/trip.model';
import { Park } from '../../../../shared/park.model';

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
  alTeamNames: { short: string, long: string }[];
  nlTeamNames: { short: string, long: string }[];
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
      division[p.team.replace(' ', '')] = {
        visited: false,
        image: `${this.imageDir}${p.team.replace(' ', '').toLocaleLowerCase()}.png`,
        park: p.name,
        team: p.team
      }
    });

    this.alTeamNames = Object.keys(this.alTeamVisitedStatus).map(t => {
      return { long: this.alTeamVisitedStatus[t].team, short: t }
    });
    this.nlTeamNames = Object.keys(this.nlTeamVisitedStatus).map(t => {
      return { long: this.nlTeamVisitedStatus[t].team, short: t }
    });
  }

  updateTeamsVisited(trips: Trip[]) {
    this.getDivisionalVisitedTeams(trips, 'American').forEach(t => {
      this.alTeamVisitedStatus[t.replace(' ', '')].visited = true;
    });
    this.getDivisionalVisitedTeams(trips, 'National').forEach(t => {
      this.nlTeamVisitedStatus[t.replace(' ', '')].visited = true;
    });
  }

  onTeamSelect(team: string) {
    this.router.navigate(['/park', team]);
  }
}
