import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteProfileService {
  private apiurlDelete = 'https://prueba.citofoniadosblokes.org/users';

  constructor(private http: HttpClient) {}

  deleteProfile(id: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.delete(`${this.apiurlDelete}/${id}`, {
      headers,
      responseType: 'text',
    });
  }
}
