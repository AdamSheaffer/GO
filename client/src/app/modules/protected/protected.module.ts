import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ],
  declarations: []
})
export class ProtectedModule { }
