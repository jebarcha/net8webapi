import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => HomeComponent),
    data: { breadcrumb: 'Home' },
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
  {
    path: 'basket',
    loadChildren: () => import('./basket/basket.routes'),
  },
  {
    path: 'checkout',
    // canActivate: [authGuard],
    loadChildren: () => import('./checkout/checkout.routes'),
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.routes'),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'shop', component: ShopComponent },
//   { path: 'shop/:id', component: ProductDetailsComponent },
//   { path: '**', redirectTo: '', pathMatch: 'full' },
// ];
