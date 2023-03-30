import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '404', component: Error404Component, data: { title: '404' } },
      { path: '500', component: Error500Component, data: { title: '500' } },
      { path: '', redirectTo: '404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorsPagesRoutingModule { }
