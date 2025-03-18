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

  getAllShows(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/shows`).pipe(
      map((shows) =>
        shows.map((show) => ({
          id: show.id,
          name: show.name || 'Unknown Name',
          genres: show.genres?.length ? show.genres : ['Unknown Genre'],
          image: show.image?.medium || 'https://via.placeholder.com/150',
          summary: this.stripHtml(show.summary), // ✅ Очистка HTML перед возвратом
          rating: show.rating?.average || 'N/A',
        }))
      ),
      catchError((error) => {
        console.error('Error fetching TV shows:', error);
        return of([]);
      })
    );
  }

  searchShows(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/search/shows?q=${name}`).pipe(
      map((response) =>
        response.map((result) => ({
          id: result.show.id,
          name: result.show.name || 'Unknown Name',
          genres: result.show.genres?.length ? result.show.genres : ['Unknown Genre'],
          image: result.show.image?.medium || 'https://via.placeholder.com/150',
          summary: this.stripHtml(result.show.summary), // ✅ Очистка HTML перед возвратом
          rating: result.show.rating?.average || 'N/A',
        }))
      ),
      catchError((error) => {
        console.error('Error searching TV shows:', error);
        return of([]);
      })
    );
  }

  private stripHtml(html: string | null): string {
    if (!html) return "No description available.";
    return html
      .replace(/<\/?[^>]+(>|$)/g, "") // Убираем все HTML-теги
      .replace(/&nbsp;/g, " ") // Убираем HTML-символы пробела
      .replace(/&amp;/g, "&") // Убираем амперсанды
      .trim();
  }
}
