import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => HomeComponent),
  },
  {
    path: 'test-error',
    loadComponent: () =>
      import('./core/test-error/test-error.component').then(
        (m) => TestErrorComponent
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./core/not-found/not-found.component').then(
        (m) => NotFoundComponent
      ),
  },
  {
    path: 'server-error',
    loadComponent: () =>
      import('./core/server-error/server-error.component').then(
        (m) => ServerErrorComponent
      ),
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.routes'),
  },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
];

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'shop', component: ShopComponent },
//   { path: 'shop/:id', component: ProductDetailsComponent },
//   { path: '**', redirectTo: '', pathMatch: 'full' },
// ];
