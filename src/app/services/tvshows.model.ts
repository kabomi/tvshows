interface Rating {
  average: number;
}

interface ShowImage {
  medium: string;
  original: string;
}

export type TvShowResponse = {
  id: number;
  url: string;
  name: string;
  language: string;
  genres: string[];
  image: ShowImage;
  summary: string;
  rating: Rating;
};

export type TvShow = TvShowResponse & {
  image: string;
  rating: number;
};

export function covertTvShowResponse(response: TvShowResponse): TvShow {
  const tvShow = Object.assign({}, response, { image: response.image.medium, rating: response.rating.average });

  return tvShow;
}
