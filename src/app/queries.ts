import {
  assertInInjectionContext,
  inject,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { HeroService } from './hero.service';
import { lastValueFrom } from 'rxjs';

// https://dev.to/this-is-angular/this-is-your-signal-to-try-tanstack-query-angular-35m9
export const createQuery = <T, U>(
  query: (params?: T) => U,
  params?: T,
  { injector }: { injector?: Injector } = {}
) => {
  injector = assertInjector(createQuery, injector);
  return runInInjectionContext(injector, () => {
    return query(params);
  });
};

export function assertInjector(fn: Function, injector?: Injector): Injector {
  // we only call assertInInjectionContext if there is no custom injector
  !injector && assertInInjectionContext(fn);
  // we return the custom injector OR try get the default Injector
  return injector ?? inject(Injector);
}

export function queryCreator<T, U>(
  query: (params?: T) => U,
  params: () => T,
  injector: { injector?: Injector }
) {
  return {
    query: null as U | null,
    init: function () {
      if (this.query) {
        return;
      }
      this.query = createQuery(query, params(), injector);
    },
  };
}

export function heroQuery({ heroId }: { heroId: number }) {
  const heroService = inject(HeroService);
  return injectQuery(() => ({
    queryKey: ['heroes', heroId],
    queryFn: () => lastValueFrom(heroService.getHero(heroId)),
  }));
}

export function heroesQuery() {
  const heroService = inject(HeroService);
  return injectQuery(() => ({
    queryKey: ['heroes'],
    queryFn: () => lastValueFrom(heroService.heroes$),
  }));
}
