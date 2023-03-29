import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsPagesRoutingModule } from './errors-pages-routing.module';
import { ErrorsPagesComponent } from './pages/errors-pages/errors-pages.component';
import { Error404Component } from './pages/error404/error404.component';
import { Error403Component } from './pages/error403/error403.component';
import { Error500Component } from './pages/error500/error500.component';


@NgModule({
  declarations: [
    ErrorsPagesComponent,
    Error404Component,
    Error403Component,
    Error500Component
  ],
  imports: [
    CommonModule,
    ErrorsPagesRoutingModule
  ]
})
export class ErrorsPagesModule { }
