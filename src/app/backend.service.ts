import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackendService {
  constructor(private http: HttpClient) {}

  getCastByShow(showId: any): Observable<any> {
    return this.http.get('https://api.tvmaze.com/shows/' + showId + '/cast');
  }

  searchShows(name: any): Observable<any> {
    return this.http.get('https://api.tvmaze.com/search/shows?q=' + name);
  }

  getAllShows(pageNum: any): Observable<any> {
    return this.http.get('https://api.tvmaze.com/shows?page=' + pageNum);
  }
}
