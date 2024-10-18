import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../../interfaces/login';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiurlLogin = 'https://prueba.citofoniadosblokes.org/auth/login';

  constructor(private http: HttpClient) {}

  login(user: Login): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(this.apiurlLogin, user, { headers }).pipe(
      catchError((error) => {
        console.error('Login error', error);
        throw error;
      })
    );
  }
 
}
