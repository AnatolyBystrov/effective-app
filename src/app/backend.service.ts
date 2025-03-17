import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private BASE_URL = 'https://api.tvmaze.com';

  constructor(private http: HttpClient) {}

  // Получаем список всех шоу
  getAllShows(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/shows`).pipe(
      map((shows) =>
        shows.map((show) => ({
          id: show.id,
          name: show.name || 'Unknown Name',
          genres: show.genres?.length ? show.genres : ['Unknown Genre'],
          image: show.image?.medium || 'https://via.placeholder.com/150',
          summary: show.summary ? this.stripHtml(show.summary) : 'No description available.',
        }))
      ),
      catchError((error) => {
        console.error('Error fetching TV shows:', error);
        return of([]);
      })
    );
  }

  // Поиск шоу по названию
  searchShows(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/search/shows?q=${name}`).pipe(
      map((response) =>
        response.map((result) => ({
          id: result.show.id,
          name: result.show.name || 'Unknown Name',
          genres: result.show.genres?.length ? result.show.genres : ['Unknown Genre'],
          image: result.show.image?.medium || 'https://via.placeholder.com/150',
          summary: result.show.summary ? this.stripHtml(result.show.summary) : 'No description available.',
        }))
      ),
      catchError((error) => {
        console.error('Error searching TV shows:', error);
        return of([]);
      })
    );
  }

  // Удаляем HTML-теги из описания
  private stripHtml(html: string): string {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || "No description available.";
  }
}
