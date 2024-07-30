import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { User } from '@shared/models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSourceSignal = signal<User | null>(null);

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}

  login(values: any) {
    return this.http.post<User>(`${this.baseUrl}account/login`, values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSourceSignal.set(user);
      })
    );
  }

  register(values: any) {
    return this.http.post<User>(`${this.baseUrl}account/register`, values).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSourceSignal.set(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSourceSignal.set(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(
      `${this.baseUrl}account/emailExists?email=${email}`
    );
  }
}
