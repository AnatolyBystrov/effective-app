import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ShowListComponent } from './app/shows.component';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <h2>TV show search</h2>
    <shows></shows>
  `,
  imports: [ShowListComponent],
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, { providers: [provideHttpClient()] });
