import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './hero-list.component';
import { HeroDetailsComponent } from './hero-details.component';

const routes: Routes = [
  {
    path: '',
    component: HeroListComponent,
  },
  {
    path: ':heroId',
    component: HeroDetailsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
