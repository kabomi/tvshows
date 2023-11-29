import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonTitle, IonList, IonItem } from '@ionic/angular/standalone';
import { TvShow } from 'src/app/services/tvshows.model';
import { TvshowItemComponent } from '../tvshow-item/tvshow-item.component';
import { register } from 'swiper/element/bundle';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { distinctUntilChanged } from 'rxjs';

register();

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonGrid, IonRow, IonCol, IonList, IonItem, CommonModule, IonTitle, TvshowItemComponent, ScrollingModule],
})
export class DashboardComponent implements OnInit {
  Breakpoints = Breakpoints;
  slidesPerView: number = 3;

  @Input()
  genres: string[] = [];

  @Input()
  tvShowsByGenre = new Map<string, TvShow[]>();

  @Input()
  showsPerGenreLimit = 5;

  constructor(private breakpointObserver: BreakpointObserver) {}

  trackByFn: (id: number, name: string) => string = (id, name) => name;
  trackByShowFn: (id: number, tvShow: TvShow) => string = (id, tvShow) => tvShow.name;

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(max-width: 599px)'])
    .pipe(distinctUntilChanged());

  ngOnInit(): void {
    this.breakpoint$.subscribe(() => this.breakpointChanged());
  }

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.slidesPerView = 5;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.slidesPerView = 3;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.slidesPerView = 2;
    } else if (this.breakpointObserver.isMatched('(max-width: 599px)')) {
      this.slidesPerView = 1;
    }
  }
}
