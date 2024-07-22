import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand, Pagination, Product, ShopParams, Type } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  private http = inject(HttpClient);

  constructor() {}

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    const { brandId, typeId, sort, pageNumber, pageSize, search } = shopParams;

    if (brandId > 0) params = params.append('brandId', shopParams.brandId);
    if (shopParams.typeId > 0) params = params.append('typeId', typeId);
    params = params.append('sort', sort);
    params = params.append('pageIndex', pageNumber);
    params = params.append('pageSize', pageSize);
    if (search) params = params.append('search', search);

    return this.http.get<Pagination<Product[]>>(`${this.baseUrl}products`, {
      params,
    });
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.baseUrl}products/${id}`);
  }

  getBrands() {
    return this.http.get<Brand[]>(`${this.baseUrl}products/brands`);
  }

  getTypes() {
    return this.http.get<Type[]>(`${this.baseUrl}products/types`);
  }
}
