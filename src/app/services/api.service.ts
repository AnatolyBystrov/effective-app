import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'https://api.tvmaze.com/shows';

  constructor(private http: HttpClient) {}

  getAllShows(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }
}

export default ApiService;  
