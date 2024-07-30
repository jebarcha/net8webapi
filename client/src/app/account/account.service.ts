import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { User } from '@shared/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  currentUserSourceSignal = signal<User | null>(null);

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}

  loadCurrentUser(token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.baseUrl}account`, { headers }).pipe(
      map((user) => {
        localStorage.setItem('token', user.token);
        this.currentUserSourceSignal.set(user);
      })
    );
  }

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
