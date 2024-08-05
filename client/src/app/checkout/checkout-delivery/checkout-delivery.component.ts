import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DeliveryMethod } from '@shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'checkout-delivery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CdkStepperModule],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss',
})
export class CheckoutDeliveryComponent implements OnInit {
  checkoutForm = input.required<FormGroup>();
  deliveryMethods = signal<DeliveryMethod[]>([]);

  private checkoutService = inject(CheckoutService);
  private basketService = inject(BasketService);

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (dm) => {
        this.deliveryMethods.set(dm);
      },
    });
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }
}
