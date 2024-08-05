import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { ShopComponent } from './shop/shop.component';
import { SectionHeaderComponent } from './core/section-header/section-header.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    ShopComponent,
    SectionHeaderComponent,
    NgxSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private basketService = inject(BasketService);
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) this.basketService.getBasket(basketId);
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe({
      next: () => {
        //console.log(this.accountService.currentUserSignal());
      },
    });
  }
}
