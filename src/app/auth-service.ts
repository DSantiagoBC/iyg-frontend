import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, Observable, shareReplay, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string) {
    return this.http.post('/api/auth/login', { username, password }, { observe: 'response' }).pipe(
      catchError((_, caught) => caught),
      shareReplay(1),
    );
  }

  public logout() {
    return this.http.post('/api/auth/logout', null);
  }

  public signup(user: User) {
    return this.http.put('/api/auth/signup', user, { observe: 'response' }).pipe(
      catchError((_, caught) => caught),
      shareReplay(1)
    );
  }
}
