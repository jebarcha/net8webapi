import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  private bcService = inject(BreadcrumbService);
  private basketService = inject(BasketService);

  product?: Product;
  quantity = 1;
  quantityInBasket = 0;

  constructor() {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
      this.shopService.getProduct(+id).subscribe({
        next: (product) => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);

          // this.basketService.basketSource$.pipe(take(1)).subscribe({
          //   next: (basket) => {
          //     const item = basket?.items.find((x) => x.id === +id);
          //     if (item) {
          //       this.quantity = item.quantity;
          //       this.quantityInBasket = item.quantity;
          //     }
          //   },
          // });
          const item = this.basketService
            .basketSignal()
            ?.items.find((x) => x.id === +id);
          if (item) {
            this.quantity = item.quantity;
            this.quantityInBasket = item.quantity;
          }
        },
        error: (error) => console.log(error),
      });
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 0 && this.quantityInBasket != 0) this.quantity--;
  }

  updateBasket() {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.product, itemsToAdd);
      } else {
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
      }
    }
  }

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }
}
