import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./basket.component').then((m) => m.BasketComponent),
  },
  // {
  //   path: ':id',
  //   loadComponent: () =>
  //     import('./product-details/product-details.component').then(
  //       (m) => m.ProductDetailsComponent
  //     ),
  //   data: { breadcrumb: { alias: 'productDetails' } },
  // },
] as Routes;
