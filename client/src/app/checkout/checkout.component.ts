import { Component, inject, OnInit } from '@angular/core';
import { OrderTotalsComponent } from '@shared/order-totals/order-totals.component';
import { StepperComponent } from '@shared/components/stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    OrderTotalsComponent,
    StepperComponent,
    CdkStepperModule,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.getAddressFormValues();
  }

  checkoutForm = this.fb.group({
    addressForm: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    }),
    deliveryForm: this.fb.group({
      deliveryMethod: ['', Validators.required],
    }),
    paymentForm: this.fb.group({
      nameOnCard: ['', Validators.required],
    }),
  });

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe({
      next: (address) => {
        address && this.checkoutForm.get('addressForm')?.patchValue(address);
      },
    });
  }
}
