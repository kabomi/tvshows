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
  it('should get all tvshows filtered by genre', async () => {
    const harryPotterMovie = { name: 'Harry Potter', rating: { average: 5.3}, genres: ['Drama', 'Thriller', 'Science-Fiction'] } as TvShow;
    const flockerMovie = { name: 'Flocker', rating: { average: 9.3}, genres: ['Crime', 'Action'] } as TvShow;
    const dragonMovie = { name: 'Dragon', rating: { average: 6.3}, genres: ['Drama', 'Action'] } as TvShow;
    mockedTvShows = [harryPotterMovie, flockerMovie,  dragonMovie] as TvShow[];
    let tvShows = service.getShowsByGenre('Drama').subscribe((tvShows) => {
      expect(tvShows).toContain(harryPotterMovie);
      expect(tvShows).toContain(dragonMovie);
      expect(tvShows).not.toContain(flockerMovie);
    });

    let request = httpClient.expectOne('https://api.tvmaze.com/shows');
    request.flush(mockedTvShows);

    tvShows = service.getShowsByGenre('Action').subscribe((tvShows) => {
      expect(tvShows).toContain(flockerMovie);
      expect(tvShows).toContain(dragonMovie);
      expect(tvShows).not.toContain(harryPotterMovie);
    });

    request = httpClient.expectOne('https://api.tvmaze.com/shows');
    request.flush(mockedTvShows);

    tvShows = service.getShowsByGenre('Thriller').subscribe((tvShows) => {
      expect(tvShows).toContain(harryPotterMovie);
      expect(tvShows).not.toContain(flockerMovie);
      expect(tvShows).not.toContain(dragonMovie);
    });

    request = httpClient.expectOne('https://api.tvmaze.com/shows');

    request.flush(mockedTvShows);
  })
});
