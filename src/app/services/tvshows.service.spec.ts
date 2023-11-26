import { TvShowOptions } from './tvshows.options';
import { TestBed } from '@angular/core/testing';

import { TvshowsService } from './tvshows.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TvShow } from './tvshows.model';

describe('TvshowsService', () => {
  let service: TvshowsService;
  let httpClient: HttpTestingController;
  let mockedTvShows: TvShow[]
  let apiOptions: TvShowOptions;

  beforeEach(() => {
    apiOptions = new TvShowOptions('https://api.tvshows.com', { getAllShows: '/shows'});
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: TvShowOptions,
        useValue: apiOptions
      }]
    });
    service = TestBed.inject(TvshowsService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tvshows on init', async () => {
    mockedTvShows = [{ name: 'Harry Potter' }] as TvShow[];
    service.init().subscribe((tvShows) => {
      expect(tvShows).toHaveSize(1);
    });

    const request = httpClient.expectOne(apiOptions.allShowsUrl);

    request.flush(mockedTvShows);
  });

  it('should fetch all tvshows after init without firing another request', async () => {
    mockedTvShows = [{ name: 'Harry Potter' }] as TvShow[];
    service.init().subscribe();

    service.tvShows$.subscribe((tvShows) => {
      expect(tvShows).toHaveSize(1);
    });

    const request = httpClient.expectOne(apiOptions.allShowsUrl);

    request.flush(mockedTvShows);
  })
  it('should fetch all tvshows ordered by rating', async () => {
    mockedTvShows = [{ name: 'Harry Potter', rating: { average: 5.3} }, { name: 'Flocker', rating: { average: 9.3} }] as TvShow[];
    service.init().subscribe();
    service.tvShows$.subscribe((tvShows) => {
      expect(tvShows[0].name).toBe('Flocker');
    });

    const request = httpClient.expectOne(apiOptions.allShowsUrl);

    request.flush(mockedTvShows);
  })
  it('should get all tvshows filtered by genre', async () => {
    const harryPotterMovie = { name: 'Harry Potter', rating: { average: 5.3}, genres: ['Drama', 'Thriller', 'Science-Fiction'] } as TvShow;
    const flockerMovie = { name: 'Flocker', rating: { average: 9.3}, genres: ['Crime', 'Action'] } as TvShow;
    const dragonMovie = { name: 'Dragon', rating: { average: 6.3}, genres: ['Drama', 'Action'] } as TvShow;
    mockedTvShows = [harryPotterMovie, flockerMovie,  dragonMovie] as TvShow[];
    service.init().subscribe();

    service.getShowsByGenre('Drama').subscribe((tvShows) => {
      expect(tvShows).toContain(harryPotterMovie);
      expect(tvShows).toContain(dragonMovie);
      expect(tvShows).not.toContain(flockerMovie);
    });
  
    let request = httpClient.expectOne(apiOptions.allShowsUrl);
    request.flush(mockedTvShows);

    service.getShowsByGenre('Action').subscribe((tvShows) => {
      expect(tvShows).toContain(flockerMovie);
      expect(tvShows).toContain(dragonMovie);
      expect(tvShows).not.toContain(harryPotterMovie);
    });

    httpClient.expectNone(apiOptions.allShowsUrl);

    service.getShowsByGenre('Thriller').subscribe((tvShows) => {
      expect(tvShows).toContain(harryPotterMovie);
      expect(tvShows).not.toContain(flockerMovie);
      expect(tvShows).not.toContain(dragonMovie);
    });

    httpClient.expectNone(apiOptions.allShowsUrl);
  })
});
