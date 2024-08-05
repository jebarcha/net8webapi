import { CdkStepperModule } from '@angular/cdk/stepper';
import { Component, inject, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Address, Basket } from '@shared/models';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'checkout-payment',
  standalone: true,
  imports: [CdkStepperModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss',
})
export class CheckoutPaymentComponent {
  checkoutForm = input<FormGroup>();

  private basketService = inject(BasketService);
  private checkoutService = inject(CheckoutService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) return;

    const orderToCreate = this.getOrderToCreate(basket);
    if (!orderToCreate) return;
    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: (order) => {
        this.toastr.success('Order created Successfully');
        this.basketService.deleteLocalBasket();
        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], navigationExtras);
        console.log(order);
      },
    });
  }

  private getOrderToCreate(basket: Basket) {
    const deliveryMethod = this.checkoutForm()
      ?.get('deliveryForm')
      ?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm()?.get('addressForm')
      ?.value as Address;
    if (!deliveryMethod || !shipToAddress) return;
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethod,
      shipToAddress: shipToAddress,
    };
  }
}
