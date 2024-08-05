import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { DeliveryMethod } from '@shared/models/deliveryMethod';
import { Order, OrderToCreate } from '@shared/models/order';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  constructor() {}

  createOrder(order: OrderToCreate) {
    return this.http.post<Order>(`${this.baseUrl}orders`, order);
  }

  getDeliveryMethods() {
    return this.http
      .get<DeliveryMethod[]>(`${this.baseUrl}orders/deliveryMethods`)
      .pipe(
        map((dm) => {
          return dm.sort((a, b) => b.price - a.price);
        })
      );
  }
}
