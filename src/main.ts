import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ShowsComponent } from './app/shows.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-root',
  template: `
    <app-shows></app-shows>
  `,
  standalone: true,
  imports: [ShowsComponent, CommonModule],  
})
export class App {}

bootstrapApplication(App, { providers: [provideHttpClient()] });
