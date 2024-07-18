import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand, Pagination, Product, Type } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  private http = inject(HttpClient);

  constructor() {}

  getProducts(brandId?: number, typeId?: number, sort?: string) {
    let params = new HttpParams();

    if (brandId) params = params.append('brandId', brandId);
    if (typeId) params = params.append('typeId', typeId);
    if (sort) params = params.append('sort', sort);

    return this.http.get<Pagination<Product[]>>(`${this.baseUrl}products`, {
      params,
    });
  }

  getBrands() {
    return this.http.get<Brand[]>(`${this.baseUrl}products/brands`);
  }

  getTypes() {
    return this.http.get<Type[]>(`${this.baseUrl}products/types`);
  }
}
