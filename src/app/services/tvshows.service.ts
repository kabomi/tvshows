import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TvShow } from './tvshows.model';
import { Observable, ReplaySubject, of, switchMap, tap } from 'rxjs';
import { TvShowOptions } from './tvshows.options';

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  constructor(
    private httpClient: HttpClient,
    private tvShowsOptions: TvShowOptions,
  ) {}

  // update subscribers before init and new subscribers with last value
  private tvShowsSubject: ReplaySubject<TvShow[]> = new ReplaySubject(1);

  get tvShows$(): Observable<TvShow[]> {
    return this.tvShowsSubject.asObservable();
  }

  public getShowsByGenre(genre: string): Observable<TvShow[]> {
    return this.tvShows$.pipe(switchMap((shows) => of(shows.filter((show) => show.genres.includes(genre)))));
  }

  public init(): Observable<TvShow[]> {
    return this.getAllShows().pipe(
      tap((tvShows) => {
        this.updateTvShows(tvShows);
      }),
    );
  }

  private getAllShows(): Observable<TvShow[]> {
    return this.httpClient
      .get<TvShow[]>(this.tvShowsOptions.allShowsUrl)
      .pipe(switchMap((shows) => of(shows.sort((a, b) => b.rating.average - a.rating.average))));
  }

  private updateTvShows(tvShows: TvShow[]) {
    this.tvShowsSubject.next(tvShows);
  }
}
