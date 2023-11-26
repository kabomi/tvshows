import { TestBed } from '@angular/core/testing';

import { TvshowsService } from './tvshows.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TvShow } from './tvshows.model';

describe('TvshowsService', () => {
  let service: TvshowsService;
  let httpClient: HttpTestingController;
  let mockedTvShows: TvShow[]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TvshowsService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tvshows', async () => {
    mockedTvShows = [{ name: 'Harry Potter' }] as TvShow[];
    const tvShows = service.getAllShows().subscribe((tvShows) => {
      expect(tvShows).toHaveSize(1);
    });

    const request = httpClient.expectOne('https://api.tvmaze.com/shows');

    request.flush(mockedTvShows);
  })
  it('should fetch all tvshows ordered by rating', async () => {
    mockedTvShows = [{ name: 'Harry Potter', rating: { average: 5.3} }, { name: 'Flocker', rating: { average: 9.3} }] as TvShow[];
    const tvShows = service.getAllShows().subscribe((tvShows) => {
      expect(tvShows[0].name).toBe('Flocker');
    });

    const request = httpClient.expectOne('https://api.tvmaze.com/shows');

    request.flush(mockedTvShows);
  })
});
