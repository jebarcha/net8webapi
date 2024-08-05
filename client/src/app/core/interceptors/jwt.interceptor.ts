import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../../account/account.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);

  //console.log('from Interceptor: ', accountService.currentUserSignal());

  if (accountService.currentUserSignal()?.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accountService.currentUserSignal()?.token}`,
      },
    });
  }
  return next(req);
};
