import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
    imports: [
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
        HomeComponent
    ],
    providers: [
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
