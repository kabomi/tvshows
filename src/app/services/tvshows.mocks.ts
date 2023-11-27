import { TvShowResponse } from './tvshows.model';

export const harryPotterMovie = {
  name: 'Harry Potter',
  rating: { average: 5.3 },
  image: { medium: 'harry.jpeg', original: 'potter.jpeg' },
  genres: ['Drama', 'Thriller', 'Science-Fiction'],
  summary: '<b>bla bla bla</b>',
} as TvShowResponse;
export const flockerMovie = {
  name: 'Flocker',
  rating: { average: 9.3 },
  image: { medium: 'flocker.jpeg', original: 'flocker2.jpeg' },
  genres: ['Crime', 'Action'],
} as TvShowResponse;
export const dragonMovie = {
  name: 'Dragon',
  rating: { average: 6.3 },
  image: { medium: 'dragon.jpeg', original: 'dragon2.jpeg' },
  genres: ['Drama', 'Action'],
} as TvShowResponse;
export const lastActionMovie = {
  name: 'Last Action Hero',
  rating: { average: 7.3 },
  image: { medium: 'last.jpeg', original: 'last2.jpeg' },
  genres: ['Action'],
} as TvShowResponse;
