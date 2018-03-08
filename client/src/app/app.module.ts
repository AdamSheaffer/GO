import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ClarityModule } from 'clarity-angular';
import { AlertIconAndTypesService } from 'clarity-angular/emphasis/alert/providers/icon-and-types-service';

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

import { AuthGuard } from './guards/auth.guard';


import { ParkDetailsComponent } from './components/park-details/park-details.component';


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
        ParkDetailsComponent
    ],
    providers: [
        AlertIconAndTypesService,
        LocationService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
