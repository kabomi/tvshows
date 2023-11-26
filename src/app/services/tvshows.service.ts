import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TvShow } from './tvshows.model';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {

  constructor(private httpClient: HttpClient) { }

  getAllShows(): Observable<TvShow[]> {
    return this.httpClient.get<TvShow[]>('https://api.tvmaze.com/shows')
      .pipe(switchMap((shows) => of(shows.sort((a, b) => b.rating.average - a.rating.average))));
  }

  getShowsByGenre(genre: string): Observable<TvShow[]> {
    return this.getAllShows().pipe(
      switchMap((shows) => 
        of(shows.filter((show) => show.genres.includes(genre)))));
  }
}
