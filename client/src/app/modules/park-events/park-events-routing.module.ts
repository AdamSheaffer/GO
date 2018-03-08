import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketFinderComponent, ParkDetailsComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: 'finder' },
  { path: 'finder', component: TicketFinderComponent },
  { path: ':team', component: ParkDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkEventsRoutingModule { }
