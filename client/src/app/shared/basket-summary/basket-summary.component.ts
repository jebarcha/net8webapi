import { Component, inject, input, output } from '@angular/core';
import { BasketItem } from '@shared/models';
import { BasketService } from '../../basket/basket.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'basket-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './basket-summary.component.html',
  styleUrl: './basket-summary.component.scss',
})
export class BasketSummaryComponent {
  public basketService = inject(BasketService);

  addItem = output<BasketItem>();
  removeItem = output<{ id: number; quantity: number }>();
  isBasket = input(true);

  addBasketItem(item: BasketItem) {
    this.addItem.emit(item);
  }

  removeBasketItem(id: number, quantity = 1) {
    this.removeItem.emit({ id, quantity });
  }
}
