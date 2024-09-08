import { Component } from '@angular/core';
import { createQuery, heroesQuery } from './queries';

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
  query = createQuery(heroesQuery, null);
}
