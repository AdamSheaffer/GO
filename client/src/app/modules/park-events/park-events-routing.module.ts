import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketFinderComponent, ParkDetailsComponent, ParkDetailsWelcomeComponent, ParkDetailsHomeComponent } from './components';
import { ParkResolverService } from './services';

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
        component: ParkDetailsComponent,
        resolve: { park: ParkResolverService }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkEventsRoutingModule { }
