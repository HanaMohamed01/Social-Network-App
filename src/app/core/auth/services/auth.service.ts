import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiService = inject(ApiService);

  signUp(data: object): Observable<any> {
    return this.httpClient.post(
      `${this.apiService.apiBaseUrl}users/signup`,
      data,
    );
  }

  signIn(data: object): Observable<any> {
    return this.httpClient.post(
      `${this.apiService.apiBaseUrl}users/signin`,
      data,
    );
  }
}
