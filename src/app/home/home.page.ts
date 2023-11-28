import { IonicModule, IonSearchbar } from '@ionic/angular';
import { TvShowOptions } from './../services/tvshows.options';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TvshowsService } from '../services/tvshows.service';
import * as _ from 'lodash';
import { TvShow } from '../services/tvshows.model';
import { Observable, map, Subscription, combineLatest, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TvshowDetailNavigationDirective } from '../components/tvshow-detail-navigation.directive';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, DashboardComponent, CommonModule, TvshowDetailNavigationDirective],
})
export class HomePage implements OnInit, OnDestroy {
  genres: string[] = [];
  tvShowsByGenre = new Map<string, TvShow[]>();
  showsPerGenreLimit: number;

  items$: Observable<{ id: string; name: string }[] | null> = of([]);
  @ViewChild(IonSearchbar, { static: true }) searchBar!: IonSearchbar;

  private _tvShowSubscription!: Subscription;

  constructor(
    private tvShowsService: TvshowsService,
    private tvShowOptions: TvShowOptions,
  ) {
    this.showsPerGenreLimit = this.tvShowOptions.showsPerGenreLimit;
  }

  ngOnInit() {
    this._tvShowSubscription = this.tvShowsService.tvShows$.subscribe((data) => {
      this.genres = _.uniq(data.flatMap((tvShow) => tvShow.genres));
      this.genres.map((genre) => {
        const tvShows = data.filter((tvShow) => tvShow.genres.includes(genre)).slice(0, this.showsPerGenreLimit);
        this.tvShowsByGenre.set(genre, tvShows);
      });

      const searchFilter$ = this.searchBar.ionInput.pipe(map((event) => (event.target as HTMLInputElement).value));

      const tvShows$ = this.tvShowsService.tvShows$;

      this.items$ = combineLatest({ tvShows$, searchFilter$ }).pipe(
        map(({ tvShows$: shows, searchFilter$: filter }) =>
          shows
            .filter((state) => filter && state.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
            .map((state) => ({ id: state.id, name: state.name })),
        ),
      );
    });
  }

  ngOnDestroy(): void {
    this._tvShowSubscription?.unsubscribe();
  }
}
