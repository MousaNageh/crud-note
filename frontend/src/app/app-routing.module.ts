import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/main-layout/layout/layout.component';
import { AuthGuard } from './core/services/guards/auth.guard';
import { LoginGuard } from './core/services/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // resolve: { services: ServiesResolver },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'notes',
        loadChildren: () =>
          import('./modules/notes/notes.module').then((m) => m.NotesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/login/login.module').then((m) => m.LoginModule),
        canActivate: [LoginGuard],
      },
    ],
  },
  {
    path: 'errors',
    loadChildren: () =>
      import('./modules/errors-pages/errors-pages.module').then(
        (m) => m.ErrorsPagesModule
      ),
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/errors/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      useHash: false,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 0],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
