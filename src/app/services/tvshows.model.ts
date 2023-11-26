interface Rating {
  average: number;
}

export interface TvShow {
  id: number;
  url: string;
  name: string;
  language: string;
  genres: string[];
  image: string;
  summary: string;
  rating: Rating;
}
