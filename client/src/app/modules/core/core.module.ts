import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROVIDERS } from './services';
import { COMPONENTS } from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations/';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  providers: [
    ...PROVIDERS
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS,
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been imported. It should only be imported into AppModule');
    }
  }
}
