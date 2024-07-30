import { Component, inject } from '@angular/core';
import { BasketService } from './basket.service';
import { CommonModule } from '@angular/common';
import { OrderTotalsComponent } from '../shared/order-totals/order-totals.component';
import { RouterModule } from '@angular/router';
import { BasketItem } from '@shared/models';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, OrderTotalsComponent, RouterModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  basketService = inject(BasketService);

  incrementQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeItem(id: number, quantity: number) {
    this.basketService.removeItemFromBasket(id, quantity);
  }
}
