import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ClarityModule } from 'clarity-angular';
import { AlertIconAndTypesService } from 'clarity-angular/emphasis/alert/providers/icon-and-types-service';
import { ClrIconModule } from 'clarity-angular/icon/icon.module';
import 'clarity-icons'; // loads only core-shapes alone and Clarity Icons API
import 'clarity-icons/shapes/all-shapes'; // loads all shapes from all sets

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { EventService } from './services/event.service';
import { ParkService } from './services/park.service';
import { AppFlashComponent } from './components/app-flash/app-flash.component';
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
import { StarsComponent } from './components/stars/stars.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ClarityModule.forRoot(),
        ClrIconModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        AppFlashComponent,
        MapComponent,
        TicketFinderComponent,
        TicketListComponent,
        ParksComponent,
        TripLoggerComponent,
        UserTripsComponent,
        TripsMapComponent,
        TripListComponent,
        StarsComponent
    ],
    providers: [
        AuthService,
        AlertService,
        AlertIconAndTypesService,
        EventService,
        LocationService,
        ParkService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
