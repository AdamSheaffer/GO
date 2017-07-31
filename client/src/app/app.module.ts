import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    ClarityModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [AppComponent, NavbarComponent, HomeComponent, RegisterComponent, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
