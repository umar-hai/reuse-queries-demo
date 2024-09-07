import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeroListComponent } from './hero-list.component';
import { HeroDetailsComponent } from './hero-details.component';
import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';

@NgModule({
  declarations: [AppComponent, HeroListComponent, HeroDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [provideAngularQuery(new QueryClient())],
  bootstrap: [AppComponent],
})
export class AppModule {}
