import { lastValueFrom } from 'rxjs';
import { TvshowsService } from './../services/tvshows.service';

export function loadTvShows(tvShowsService: TvshowsService) {
  const init = () => lastValueFrom(tvShowsService.init());
  return init;
}
