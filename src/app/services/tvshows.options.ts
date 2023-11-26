interface TvShowUrls {
  getAllShows: string;
}
interface Options {
  apiUrl: string;
  urls: TvShowUrls;
  showsPerGenreLimit: number;
}

export class TvShowOptions implements Options {
  constructor(
    public apiUrl: string,
    public urls: TvShowUrls,
    public showsPerGenreLimit: number = 10,
  ) {}

  get allShowsUrl() {
    return `${this.apiUrl}${this.urls.getAllShows}`;
  }
}
