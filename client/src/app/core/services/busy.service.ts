import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbService } from 'xng-breadcrumb';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyRequestCount = 0;

  private spinnerService = inject(NgxSpinnerService);

  constructor() {}

  busy() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'timer',
      bdColor: 'rbga(255,255,255,0.7)',
      color: '#333333',
    });
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
