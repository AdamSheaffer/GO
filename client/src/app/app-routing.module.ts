import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
    { path: 'events', loadChildren: './modules/park-events/park-events.module#ParkEventsModule' },
    { path: 'trips', loadChildren: './modules/trips/trips.module#TripsModule', canActivate: [AuthGuard] },
    { path: '**', loadChildren: './modules/not-found/not-found.module#NotFoundModule' }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }