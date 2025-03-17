import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';  
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],  
})
export class ShowsComponent implements OnInit {
  shows: any[] = [];
  filteredShows: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllShows().subscribe({
      next: (data: any[]) => {
        this.shows = data;
        this.filteredShows = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('API error:', err);
        this.error = 'Failed to load TV shows. Please try again later.';
        this.loading = false;
      }
    });
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredShows = this.shows.filter(show => show.name.toLowerCase().includes(input));
  }
}
