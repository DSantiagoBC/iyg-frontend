import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, shareReplay } from 'rxjs';
import { User } from '../interfaces/user';

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
    return this.http.post('/api/auth/logout', null).pipe(catchError((_, caught) => caught));
  }

  public signup(user: User) {
    return this.http.put('/api/auth/signup', user, { observe: 'response' }).pipe(
      catchError((_, caught) => caught),
      shareReplay(1),
    );
  }
}
