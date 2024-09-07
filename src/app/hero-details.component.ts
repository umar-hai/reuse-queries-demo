import {
  Component,
  computed,
  inject,
  Injector,
  input,
  numberAttribute,
} from '@angular/core';
import { HeroService } from './hero.service';
import { heroQuery, createQuery, queryCreator } from './queries';

@Component({
  template: `<h2>Hero Detail</h2>
    @if(creator.query; as query) { @if (query.isPending()) { Loading... } @if
    (query.error()) { An error has occurred: {{ query.error()?.message }}
    } @if (query.data(); as data) {
    <div>
      {{ data.name }}
    </div>
    } }`,
})
export class HeroDetailsComponent {
  heroService = inject(HeroService);

  heroId = input.required({ transform: numberAttribute });

  injector = inject(Injector);

  creator = queryCreator(
    heroQuery,
    () => ({
      heroId: this.heroId(),
    }),
    { injector: this.injector }
  );

  ngOnInit() {
    this.creator.init();
  }
}
