import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from '../modules/login/store/effects/login-effects';
import { SharedModule } from '../shared/shared.module';
import { reducers } from '../store/state';
import { HeaderComponent } from './components/main-layout/header/header.component';
import { LayoutComponent } from './components/main-layout/layout/layout.component';
import { Interceptor } from './services/interceptors/token/token.interceptor';

@NgModule({
  declarations: [ HeaderComponent, LayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
