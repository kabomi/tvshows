interface TvShowUrls {
  getAllShows: string;
}
interface Options {
  apiUrl: string;

  urls: TvShowUrls;
}

export class TvShowOptions implements Options {
  constructor(
    public apiUrl: string,
    public urls: TvShowUrls,
  ) {}

  get allShowsUrl() {
    return `${this.apiUrl}${this.urls.getAllShows}`;
  }
}
