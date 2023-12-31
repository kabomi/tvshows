import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'tvshow',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'tvshow/:id',
    loadComponent: () => import('./tvshow/tvshow.page').then((m) => m.TvshowPage),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];
