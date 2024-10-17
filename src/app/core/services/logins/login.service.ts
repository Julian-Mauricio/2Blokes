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
  private apiurlProfile = 'https://prueba.citofoniadosblokes.org/auth/profile';
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

  profile(): Observable<any> {
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
    });

    return this.http.get<any>(this.apiurlProfile, {headers})
  }
 
}