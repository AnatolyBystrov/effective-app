import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ShowsComponent } from './app/shows.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // ✅ Добавляем

@Component({
  selector: 'app-root',
  template: `
    <h2>TV Show Search</h2>
    <app-shows></app-shows>
  `,
  standalone: true,
  imports: [ShowsComponent, CommonModule],  // ✅ Гарантированно импортирован
})
export class App {}

bootstrapApplication(App, { providers: [provideHttpClient()] });
