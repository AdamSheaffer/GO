import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ClarityModule } from 'clarity-angular';
import { AlertIconAndTypesService } from 'clarity-angular/emphasis/alert/providers/icon-and-types-service';
import { ClrIconModule } from 'clarity-angular/icon/icon.module';

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { AppFlashComponent } from './components/app-flash/app-flash.component';

@NgModule({
    imports: [
        BrowserModule,
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
        AppFlashComponent
    ],
    providers: [
        AuthService,
        AlertService,
        AlertIconAndTypesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
