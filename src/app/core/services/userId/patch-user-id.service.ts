import { HttpHeaders,  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatchUserIdService {

  private apiUrlUpdate = 'https://prueba.citofoniadosblokes.org/users';

  constructor(private http : HttpClient) { }

  updates(id:string): Observable<string>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.patch<string>(`${this.apiUrlUpdate}/${id}`, {}, { headers, responseType: 'text' as 'json' });
  
  } 

}
