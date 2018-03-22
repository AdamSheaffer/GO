import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketFinderComponent, ParkDetailsComponent } from './components';
import { ParkDetailsHomeComponent } from './components/park-details-home/park-details-home.component';

const routes: Routes = [
  { path: '', component: ParkDetailsHomeComponent },
  { path: 'finder', component: TicketFinderComponent },
  { path: ':team', component: ParkDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkEventsRoutingModule { }
