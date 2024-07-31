import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { User } from '@shared/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  currentUserSignal = signal<User | null>(null);

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}

  loadCurrentUser(token: string | null) {
    if (token === null) {
      this.currentUserSignal.set(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.baseUrl}account`, { headers }).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSignal.set(user);
          return user;
        } else {
          return null;
        }
      })
    );
  }

  login(values: any) {
    return this.http.post<User>(`${this.baseUrl}account/login`, values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSignal.set(user);
      })
    );
  }

  register(values: any) {
    return this.http.post<User>(`${this.baseUrl}account/register`, values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSignal.set(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSignal.set(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(
      `${this.baseUrl}account/emailExists?email=${email}`
    );
  }

  // updateAddress(address: Address) {
  //   return this.http.post(this.baseUrl + 'account/address', address).pipe(
  //     tap(() => {
  //       this.currentUser.update(user => {
  //         if (user) user.address = address;
  //         return user;
  //       })
  //     })
  //   )
  // }

  getAuthState() {
    return this.http.get<{ isAuthenticated: boolean }>(
      this.baseUrl + 'account/auth-status'
    );
  }
}
