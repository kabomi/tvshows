import { TvShowOptions } from './../services/tvshows.options';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TvshowsService } from '../services/tvshows.service';
import * as _ from 'lodash';
import { TvShow } from '../services/tvshows.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, DashboardComponent],
})
export class HomePage implements OnInit, OnDestroy {
  genres: string[] = [];
  tvShowsByGenre = new Map<string, TvShow[]>();
  showsPerGenreLimit: number;

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
    });
  }

  ngOnDestroy(): void {
    this._tvShowSubscription?.unsubscribe();
  }
}
