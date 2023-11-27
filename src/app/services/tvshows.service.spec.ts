import { TvShowOptions } from './tvshows.options';
import { TestBed } from '@angular/core/testing';

import { TvshowsService } from './tvshows.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TvShow, covertTvShowResponse } from './tvshows.model';
import { dragonMovie, flockerMovie, harryPotterMovie } from './tvshows.mocks';

describe('TvshowsService', () => {
  let service: TvshowsService;
  let httpClient: HttpTestingController;
  let mockedTvShows: TvShow[];
  let apiOptions: TvShowOptions;

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
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
    service = TestBed.inject(TvshowsService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tvshows on init', async () => {
    mockedTvShows = [harryPotterMovie] as TvShow[];
    service.init().subscribe((tvShows) => {
      expect(tvShows).toHaveSize(1);
    });

    const request = httpClient.expectOne(apiOptions.allShowsUrl);

    request.flush(mockedTvShows);
  });

  it('should fetch all tvshows after init without firing another request', async () => {
    mockedTvShows = [harryPotterMovie] as TvShow[];
    service.init().subscribe();

    service.tvShows$.subscribe((tvShows) => {
      expect(tvShows).toHaveSize(1);
    });

    const request = httpClient.expectOne(apiOptions.allShowsUrl);

    request.flush(mockedTvShows);
  });
  it('should fetch all tvshows ordered by rating', async () => {
    mockedTvShows = [harryPotterMovie, flockerMovie] as TvShow[];
    service.init().subscribe();
    service.tvShows$.subscribe((tvShows) => {
      expect(tvShows[0].name).toBe('Flocker');
    });

    const request = httpClient.expectOne(apiOptions.allShowsUrl);

    request.flush(mockedTvShows);
  });
  it('should get all tvshows filtered by genre', async () => {
    mockedTvShows = [harryPotterMovie, flockerMovie, dragonMovie] as TvShow[];
    service.init().subscribe();

    service.getShowsByGenre('Drama').subscribe((tvShows) => {
      expect(tvShows).toContain(covertTvShowResponse(harryPotterMovie));
      expect(tvShows).toContain(covertTvShowResponse(dragonMovie));
      expect(tvShows).not.toContain(covertTvShowResponse(flockerMovie));
    });

    let request = httpClient.expectOne(apiOptions.allShowsUrl);
    request.flush(mockedTvShows);

    service.getShowsByGenre('Action').subscribe((tvShows) => {
      expect(tvShows).toContain(covertTvShowResponse(flockerMovie));
      expect(tvShows).toContain(covertTvShowResponse(dragonMovie));
      expect(tvShows).not.toContain(covertTvShowResponse(harryPotterMovie));
    });

    httpClient.expectNone(apiOptions.allShowsUrl);

    service.getShowsByGenre('Thriller').subscribe((tvShows) => {
      expect(tvShows).toContain(covertTvShowResponse(harryPotterMovie));
      expect(tvShows).not.toContain(covertTvShowResponse(flockerMovie));
      expect(tvShows).not.toContain(covertTvShowResponse(dragonMovie));
    });

    httpClient.expectNone(apiOptions.allShowsUrl);
  });
});
