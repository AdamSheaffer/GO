import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components';
import { ClarityModule } from '@clr/angular';
// import 'clarity-icons';
// import 'clarity-icons/shapes/essential-shapes';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS,
    ClarityModule
  ]
})
export class SharedModule { }
