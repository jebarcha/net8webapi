import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopService } from './shop.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { Brand, Product, Type } from '@shared/models';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);

  products = signal<Product[]>([]);
  brands = signal<Brand[]>([]);
  types = signal<Type[]>([]);
  brandIdSelected = signal(0);
  typeIdSelected = signal(0);
  sortSelected = signal('name');
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService
      .getProducts(
        this.brandIdSelected(),
        this.typeIdSelected(),
        this.sortSelected()
      )
      .subscribe({
        next: (response) => this.products.set(response.data),
        error: (error) => console.log(error),
      });
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) =>
        this.brands.set([{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => this.types.set([{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected.set(brandId);
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected.set(typeId);
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.sortSelected.set(event.target.value);
    this.getProducts();
  }
}
