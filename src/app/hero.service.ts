import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Hero } from './hero';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeroService {
  http = inject(HttpClient);

  heroes$ = this.http
    .get<Hero[]>('/api/heroes')
    .pipe(
      tap(() => console.log(`GET /api/heroes ${new Date().toISOString()}`))
    );

  getHero(id: number) {
    return this.http
      .get<Hero>(`/api/heroes/${id}`)
      .pipe(
        tap(() =>
          console.log(`GET /api/heroes/${id} ${new Date().toISOString()}`)
        )
      );
  }
}
