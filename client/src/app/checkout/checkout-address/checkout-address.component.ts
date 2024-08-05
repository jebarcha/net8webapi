import { CdkStepperModule } from '@angular/cdk/stepper';
import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from '@shared/components/text-input/text-input.component';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'checkout-address',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    RouterModule,
    CdkStepperModule,
  ],
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss',
})
export class CheckoutAddressComponent {
  checkoutForm = input.required<FormGroup>();

  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);

  saveUserAddress() {
    this.accountService
      .updateUserAddrress(this.checkoutForm()?.get('addressForm')?.value)
      .subscribe({
        next: () => {
          this.toastr.success('Address saved');
          this.checkoutForm()
            ?.get('addressForm')
            ?.reset(this.checkoutForm()?.get('addressForm')?.value);
        },
      });
  }
}
