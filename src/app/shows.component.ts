import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
  standalone: true, // Сделай компонент автономным
  imports: [CommonModule] // Импортируй CommonModule для работы *ngIf и *ngFor
})
export class ShowsComponent implements OnInit {
  shows: any[] = [];
  filteredShows: any[] = [];
  loading = true;
  error = '';

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getAllShows().subscribe({
      next: (data) => {
        this.shows = data;
        this.filteredShows = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching shows:', err);
        this.error = 'Failed to load TV shows. Please try again.';
        this.loading = false;
      },
    });
  }

  onInput(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    
    if (!query) {
      this.filteredShows = this.shows;
      return;
    }

    this.filteredShows = this.shows.filter((show) =>
      show.name.toLowerCase().includes(query)
    );
  }
}
