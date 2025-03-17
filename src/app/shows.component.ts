import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { BackendService } from './backend.service';

interface IShow {
  name: string;
  actors: string[];
}

@Component({
  selector: 'shows',
  templateUrl: `./shows.component.html`,
  styleUrls: ['./shows.component.css'],
  standalone: true,
  imports: [NgFor],
})
export class ShowListComponent {
  shows: IShow[] = [];

  constructor(private backendService: BackendService) {}

  getAllShows(query: any) {
    this.shows = [];
    this.backendService.searchShows(query).subscribe((shows) => {
      shows.forEach((show: any, i: any) => {
        this.shows[i] = { name: show.show.name, actors: [] };
        this.backendService.getCastByShow(show.show.id).subscribe((actors) => {
          this.shows[i].actors = actors.map((a: any) => a.person.name);
        });
      });
    });
  }

  onInput(e: Event) {
    this.getAllShows((e.target as any)['value']);
  }
}
