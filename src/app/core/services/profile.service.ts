import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileRequest } from '../../interfaces/profile-request';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiurlProfile = 'https://prueba.citofoniadosblokes.org/auth/profile';
  constructor(private http : HttpClient ) { }
  profile(): Observable<ProfileRequest> {
    const headers = new HttpHeaders({
      'content-Type': 'application/json',
    });
    return this.http.get<ProfileRequest>(this.apiurlProfile, {headers})

  }
}
