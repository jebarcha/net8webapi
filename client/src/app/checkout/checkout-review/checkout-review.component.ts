import { CdkStepperModule } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { BasketSummaryComponent } from '@shared/basket-summary/basket-summary.component';

@Component({
  selector: 'checkout-review',
  standalone: true,
  imports: [BasketSummaryComponent, CdkStepperModule],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss',
})
export class CheckoutReviewComponent {}
