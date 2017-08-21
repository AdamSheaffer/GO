import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-park-details',
  templateUrl: './park-details.component.html',
  styleUrls: ['./park-details.component.css']
})
export class ParkDetailsComponent implements OnInit {
  teamName: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.teamName = this.route.snapshot.paramMap.get('team');
  }

}
