import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { TicketFinderComponent } from './components/ticket-finder/ticket-finder.component';
import { AuthGuard } from './guards/auth.guard';
import { ParkDetailsComponent } from './components/park-details/park-details.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
    { path: 'tickets', component: TicketFinderComponent },
    { path: 'trips', loadChildren: './modules/trips/trips.module#TripsModule', canActivate: [AuthGuard] },
    { path: 'park/:team', component: ParkDetailsComponent },
    { path: '**', component: HomeComponent }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }