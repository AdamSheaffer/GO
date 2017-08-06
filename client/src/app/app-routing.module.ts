import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TicketFinderComponent } from './components/ticket-finder/ticket-finder.component';
import { TripLoggerComponent } from './components/trip-logger/trip-logger.component';
import { AuthGuard } from "./guards/auth.guard";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'tickets', component: TicketFinderComponent },
    { path: 'trip/new', component: TripLoggerComponent, canActivate: [AuthGuard] },
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