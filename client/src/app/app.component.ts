import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Product } from './models/product';
import { Pagination } from './models/pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);

  title = 'Welcome to Skinet';
  //products: Product[] = [];
  products = signal<Pagination<Product[]>>({
    count: 0,
    pageIndex: 1,
    pageSize: 50,
    data: [],
  });

  ngOnInit(): void {
    this.http
      .get<Pagination<Product[]>>(
        'https://localhost:5001/api/products?pageSize=50'
      )
      .subscribe((res) => {
        this.products.set(res);
      });
    // .subscribe({
    //   next: (response) => (this.products = response.data), // what to do next
    //   error: (error) => console.log(error),
    //   complete: () => {
    //     console.log('request complete');
    //     console.log('extra statement');
    //   },
    // });
  }
}
