import {
  Component,
  inject,
  Injector,
  input,
  numberAttribute,
} from '@angular/core';
import { heroQuery, createQueryWrapper } from './queries';

@Component({
  template: `<h2>Hero Detail</h2>
    @if(wrapper.query; as query) { @if (query.isPending()) { Loading... } @if
    (query.error()) { An error has occurred: {{ query.error()?.message }}
    } @if (query.data(); as data) {
    <div>
      {{ data.name }}
    </div>
    } }`,
})
export class HeroDetailsComponent {
  heroId = input.required({ transform: numberAttribute });

  injector = inject(Injector);

  wrapper = createQueryWrapper(
    heroQuery,
    () => ({
      heroId: this.heroId(),
    }),
    { injector: this.injector }
  );

  ngOnInit() {
    this.wrapper.init();
  }
}
