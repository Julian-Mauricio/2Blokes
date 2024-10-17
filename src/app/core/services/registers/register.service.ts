import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { RegisterRequest } from '../../../interfaces/register-request';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiurl = 'https://prueba.citofoniadosblokes.org/auth/register'
  constructor(private http : HttpClient){ }
  register(userRegister:RegisterRequest):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.post<any>(this.apiurl, userRegister, {headers});
  }
}
