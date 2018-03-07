import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ClarityModule } from 'clarity-angular';
import { AlertIconAndTypesService } from 'clarity-angular/emphasis/alert/providers/icon-and-types-service';
import 'clarity-icons'; // loads only core-shapes alone and Clarity Icons API
import 'clarity-icons/shapes/all-shapes'; // loads all shapes from all sets

import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

import { MapComponent } from './components/map/map.component';
import { TicketFinderComponent } from './components/ticket-finder/ticket-finder.component';
import { LocationService } from './services/location.service';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { ParksComponent } from './components/parks/parks.component';
import { TripLoggerComponent } from './components/trip-logger/trip-logger.component';
import { AuthGuard } from './guards/auth.guard';
import { UserTripsComponent } from './components/user-trips/user-trips.component';
import { TripsMapComponent } from './components/trips-map/trips-map.component';
import { TripListComponent } from './components/trip-list/trip-list.component';

import { ProgressComponent } from './progress/progress.component';
import { UserTripsTeamsComponent } from './components/user-trips-teams/user-trips-teams.component';
import { ParkDetailsComponent } from './components/park-details/park-details.component';
import { TripLoggerEditComponent } from './components/trip-logger-edit/trip-logger-edit.component';
import { BadgesComponent } from './components/badges/badges.component';


@NgModule({
    imports: [
        ClarityModule.forRoot(),
        AppRoutingModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,

        MapComponent,
        TicketFinderComponent,
        TicketListComponent,
        ParksComponent,
        TripLoggerComponent,
        UserTripsComponent,
        TripsMapComponent,
        TripListComponent,

        ProgressComponent,
        UserTripsTeamsComponent,
        ParkDetailsComponent,
        TripLoggerEditComponent,
        BadgesComponent
    ],
    providers: [
        AlertIconAndTypesService,
        LocationService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
