import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components';
import { ClrIconModule } from 'clarity-angular';

@NgModule({
  imports: [
    CommonModule,
    ClrIconModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
