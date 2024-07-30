import {
  HttpInterceptorFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
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
    catchError((err: HttpErrorResponse) => {
      //console.log(err.status);
      switch (err.status) {
        case 400:
          if (err.error.errors) {
            const modelStateErrors = [];
            for (const key in err.error.errors) {
              if (err.error.errors[key]) {
                modelStateErrors.push(err.error.errors[key]);
              }
            }
            throw modelStateErrors.flat();
          } else {
            toastr.error(err.error.message || err.error);
          }
          break;
        case 401:
          toastr.error(err.error.message || err.error);
          break;
        case 404:
          router.navigate(['/not-found']);
          break;
        case 500:
          const navigationExtras: NavigationExtras = {
            state: { error: err.error },
          };
          //->another way use navigateByUrl instead of router.navigate(['/server-error']);
          router.navigateByUrl('/server-error', navigationExtras);
          break;
      }
      return throwError(() => err);
    })
  );
};
