import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkEventsRoutingModule } from './park-events-routing.module';
import { COMPONENTS } from './components';
import { PROVIDERS } from './services';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ParkEventsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class ParkEventsModule { }
