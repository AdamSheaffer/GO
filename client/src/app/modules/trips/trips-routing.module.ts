import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTripsComponent, TripLoggerComponent, TripLoggerEditComponent } from './components';

const routes: Routes = [
  { path: '', component: UserTripsComponent },
  { path: 'new', component: TripLoggerComponent },
  { path: 'edit/:id', component: TripLoggerEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
