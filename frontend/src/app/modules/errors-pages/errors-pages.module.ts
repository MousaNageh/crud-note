import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsPagesRoutingModule } from './errors-pages-routing.module';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';



@NgModule({
  declarations: [
    Error404Component,
    Error500Component,
  ],
  imports: [
    CommonModule,
    ErrorsPagesRoutingModule
  ]
})
export class ErrorsPagesModule { }
