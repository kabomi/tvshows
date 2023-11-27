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
  id: string;
  image: string;
  rating: number;
};

export function covertTvShowResponse(response: TvShowResponse): TvShow;
export function covertTvShowResponse(response: TvShowResponse[]): TvShow[];

export function covertTvShowResponse(response: TvShowResponse | TvShowResponse[]): TvShow | TvShow[] {
  if (Array.isArray(response)) {
    return response.map(_covertTvShowResponse);
  } else {
    return _covertTvShowResponse(response);
  }
}

function _covertTvShowResponse(response: TvShowResponse) {
  const tvShow = Object.assign({}, response, {
    id: response.id.toString(),
    image: response.image.medium,
    rating: response.rating.average,
  });
  return tvShow;
}
