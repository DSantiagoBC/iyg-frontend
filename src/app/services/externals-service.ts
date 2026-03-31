import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { External } from '../interfaces/external';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExternalsService {
  constructor(private http: HttpClient) {}

  public insert(value: External) {
    return this.http
      .put('/api/externals/insert', value, { observe: 'response' })
      .pipe(catchError((_, caught) => caught));
  }
}
