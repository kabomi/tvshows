import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomePage } from './home.page';
import { By } from '@angular/platform-browser';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TvshowsService } from '../services/tvshows.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TvShowOptions } from '../services/tvshows.options';
import { TvShow } from '../services/tvshows.model';
import { of } from 'rxjs';
import { dragonMovie, flockerMovie, harryPotterMovie } from '../services/tvshows.mocks';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiOptions: TvShowOptions;
  let tvShowsService: TvshowsService;

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  beforeEach(waitForAsync(() => {
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
    spyOnProperty(tvShowsService, 'tvShows$', 'get').and.returnValue(
      of([harryPotterMovie, flockerMovie, dragonMovie] as TvShow[]),
    );
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains a header title', () => {
    const element = fixture.debugElement.query(By.css('.home-header-title')).nativeElement as HTMLElement;
    expect(element.innerText).toContain('Movies');
  });
  it('contains a search bar', () => {
    expect(component.searchBar).toBeTruthy();
  });
  //TODO:
  //searches by tvshow name and returns a list
  //clears the list
  //jumps to the detail list on pressing on an item
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
    const dashboardComponent = fixture.debugElement.query(By.directive(DashboardComponent))
      .componentInstance as DashboardComponent;
    expect(dashboardComponent.tvShowsByGenre).toHaveSize(fetchedGenres.length);
    expect(dashboardComponent.showsPerGenreLimit).toBe(apiOptions.showsPerGenreLimit);
  });
});
