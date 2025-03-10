import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TramService {
  private dataUrl = '/assets/json/server-response.json'; 

  constructor(private http: HttpClient) {}

  getDepartures(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
}