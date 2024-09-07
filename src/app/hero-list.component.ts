import { Component, inject } from '@angular/core';
import { HeroService } from './hero.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { heroesQuery, queryCreator } from './queries';

@Component({
  template: `<h2>Hero List</h2>
    @if (query.isPending()) { Loading... } @if (query.error()) { An error has
    occurred: {{ query.error()?.message }}
    } @if (query.data(); as data) {
    <ul>
      @for (hero of data; track $index) {
      <div>
        <a [routerLink]="[hero.id]">{{ hero.name }}</a>
      </div>
      }
    </ul>
    } `,
})
export class HeroListComponent {
  heroService = inject(HeroService);

  heroes$ = this.heroService.heroes$;

  query = queryCreator(heroesQuery);
}
