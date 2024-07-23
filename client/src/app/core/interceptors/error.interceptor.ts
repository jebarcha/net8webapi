import { HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (
  req,
  next
): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 400:
          if (error.error.errors) {
            throw error.error;
          }
          console.log('comes here to this point ??');
          toastr.error(error.error.message, error.status);

          break;
        case 401:
          toastr.error(error.error.message, error.status);
          break;
        case 404:
          router.navigate(['/not-found']);
          break;
        case 500:
          const navigationExtras: NavigationExtras = {
            state: { error: error.error },
          };
          //->another way use navigateByUrl instead of router.navigate(['/server-error']);
          router.navigateByUrl('/server-error', navigationExtras);
          break;
      }
      return throwError(() => new Error(error));
    })
  );
};
