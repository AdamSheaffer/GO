import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkEventsRoutingModule } from './park-events-routing.module';
import { COMPONENTS } from './components';
import { PROVIDERS } from './services';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParkDetailsHomeComponent } from './components/park-details-home/park-details-home.component';
import { ParkDetailsSidebarComponent } from './components/park-details-sidebar/park-details-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    ParkEventsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...COMPONENTS,
    ParkDetailsHomeComponent,
    ParkDetailsSidebarComponent
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class ParkEventsModule { }
