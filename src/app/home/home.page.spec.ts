import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { By } from '@angular/platform-browser';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TvshowsService } from '../services/tvshows.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TvShowOptions } from '../services/tvshows.options';
import { TvShow } from '../services/tvshows.model';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockedTvShows: TvShow[];
  let apiOptions: TvShowOptions;
  let tvShowsService: TvshowsService;

  beforeEach(async () => {
    apiOptions = new TvShowOptions('https://api.tvshows.com', {
      getAllShows: '/shows',
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: TvShowOptions,
          useValue: apiOptions,
        },
      ],
    });
    tvShowsService = TestBed.inject(TvshowsService);
    const harryPotterMovie = {
      name: 'Harry Potter',
      rating: { average: 5.3 },
      genres: ['Drama', 'Thriller', 'Science-Fiction'],
    } as TvShow;
    const flockerMovie = {
      name: 'Flocker',
      rating: { average: 9.3 },
      genres: ['Crime', 'Action'],
    } as TvShow;
    const dragonMovie = {
      name: 'Dragon',
      rating: { average: 6.3 },
      genres: ['Drama', 'Action'],
    } as TvShow;
    spyOnProperty(tvShowsService, 'tvShows$', 'get').and.returnValue(
      of([harryPotterMovie, flockerMovie, dragonMovie] as TvShow[]),
    );
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains a header title', () => {
    const element = fixture.debugElement.query(By.css('.home-header-title')).nativeElement as HTMLElement;
    expect(element.innerText).toContain('Movies');
  });
  it('contains a dashboard', () => {
    const dashboardComponent = fixture.debugElement.query(By.directive(DashboardComponent)).componentInstance;
    expect(dashboardComponent).toBeTruthy();
  });
  it('fetches the genres and pass them down to the dashboard', () => {
    const fetchedGenres = ['Drama', 'Thriller', 'Science-Fiction', 'Crime', 'Action'];
    const dashboardComponent = fixture.debugElement.query(By.directive(DashboardComponent)).componentInstance;
    expect(dashboardComponent.genres).toEqual(fetchedGenres);
  });
  it('fetches the tvShows by Genre and pass them down to the dashboard', () => {
    const fetchedGenres = ['Drama', 'Thriller', 'Science-Fiction', 'Crime', 'Action'];
    const dashboardComponent = fixture.debugElement.query(By.directive(DashboardComponent)).componentInstance as DashboardComponent;
    expect(dashboardComponent.tvShowsByGenre).toHaveSize(fetchedGenres.length);
    expect(dashboardComponent.showsPerGenreLimit).toBe(apiOptions.showsPerGenreLimit);
  });
});
