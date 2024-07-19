import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopService } from './shop.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { Brand, Product, ShopParams, Type } from '@shared/models';
import { PagingHeaderComponent } from '@shared/paging-header/paging-header.component';
import { PagerComponent } from '@shared/pager/pager.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductItemComponent, PagingHeaderComponent, PagerComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);

  products = signal<Product[]>([]);
  brands = signal<Brand[]>([]);
  types = signal<Type[]>([]);
  //shopParams = new ShopParams();
  shopParams = signal<ShopParams>(new ShopParams());
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];
  //totalCount = 0;

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams()).subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.shopParams().pageNumber = response.pageIndex;
        this.shopParams().pageSize = response.pageSize;
        this.shopParams().totalCount = response.count;
      },
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
    //this.shopParams.set({...this.shopParams, brandId: branId});
    this.shopParams.update((x) => ({ ...x, brandId }));
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.update((x) => ({ ...x, typeId }));
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.shopParams.update((x) => ({ ...x, sort: event.target.value }));
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams().pageNumber !== event) {
      this.shopParams().pageNumber = event;
      this.getProducts();
    }
  }
}
