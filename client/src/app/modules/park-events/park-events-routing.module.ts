import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketFinderComponent, ParkDetailsComponent, ParkDetailsWelcomeComponent, ParkDetailsHomeComponent } from './components';

const routes: Routes = [
  { path: '', redirectTo: 'finder' },
  { path: 'finder', component: TicketFinderComponent },
  {
    path: 'teams',
    component: ParkDetailsHomeComponent,
    children: [
      {
        path: '',
        component: ParkDetailsWelcomeComponent
      },
      {
        path: ':team',
        component: ParkDetailsComponent
      }
    ]
  },
  { path: ':team', component: ParkDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkEventsRoutingModule { }
