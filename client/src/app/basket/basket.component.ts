import { Component, inject } from '@angular/core';
import { BasketService } from './basket.service';
import { CommonModule } from '@angular/common';
import { OrderTotalsComponent } from '../shared/order-totals/order-totals.component';
import { RouterModule } from '@angular/router';
import { BasketItem } from '@shared/models';
import { BasketSummaryComponent } from '@shared/basket-summary/basket-summary.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule,
    OrderTotalsComponent,
    RouterModule,
    BasketSummaryComponent,
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  basketService = inject(BasketService);

  incrementQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeItem(event: { id: number; quantity: number }) {
    const { id, quantity } = event;
    this.basketService.removeItemFromBasket(id, quantity);
  }
}
