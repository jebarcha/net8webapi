import { inject } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (accountService.currentUserSignal()) {
    return true;
  } else {
    router.navigate(['/account/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
};

// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { map, of } from 'rxjs';
// import { AccountService } from '../../account/account.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const accountService = inject(AccountService);
//   const router = inject(Router);

//   console.log('Authguard');
//   console.log(accountService.currentUserSignal());

//   if (accountService.currentUserSignal()) {
//     return of(true);
//   } else {
//     return accountService.getAuthState().pipe(
//       map((auth) => {
//         if (auth.isAuthenticated) {
//           return true;
//         } else {
//           //console.log(state.url);
//           //console.log('isAuth', auth.isAuthenticated);
//           console.log('hello from here');
//           router.navigate(['/account/login'], {
//             queryParams: { returnUrl: state.url },
//           });
//           return false;
//         }
//       })
//     );
//   }
// };
