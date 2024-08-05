import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: 'success',
    loadComponent: () =>
      import('./checkout-success/checkout-success.component').then(
        (m) => m.CheckoutSuccessComponent
      ),
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
