import { Genre, Movie, Review } from "../models/movie.models";
import {
  GenreResponse,
  MovieResponse,
  ReviewResponse,
  ReviewsApiResponse,
  SimilarMoviesApiResponse,
  VideosApiResponse,
} from "../models/movieResponse.models";

export const mockGenres: Genre = {
  1: "Action",
  2: "Comedy",
  3: "Drama",
  4: "Crime",
  5: "Romance",
};

export const mockGenresResponse: GenreResponse[] = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Crime" },
  { id: 5, name: "Romance" },
];

export const mockMovieResponse: MovieResponse = {
  poster_path: "/some_path.jpg",
  adult: false,
  overview: "From DC Comics comes the Suicide Squad.",
  release_date: "2016-08-03",
  genre_ids: [1, 4],
  id: 297761,
  original_title: "Suicide Squad",
  original_language: "en",
  title: "Suicide Squad",
  backdrop_path: "/some_path.jpg",
  popularity: 48.261451,
  vote_count: 1466,
  video: false,
  vote_average: 5.91,
};

export const mockMovie: Movie = {
  id: 297761,
  title: "Suicide Squad",
  overview: "From DC Comics comes the Suicide Squad.",
  releaseYear: 2016,
  genre: "Action",
  rating: 5.91,
  posterUrl: "/some_path.jpg",
};

export const mockReviewResponse: ReviewResponse = {
  author: "Cat Ellington",
  author_details: {
    name: "Cat Ellington",
    username: "CatEllington",
    avatar_path: "/avatar1.jpg",
    rating: 4,
  },
  content: "I wasted my time",
  created_at: "2017-02-13T22:23:01.268Z",
  id: "1234567",
  updated_at: "2017-02-13T23:16:19.538Z",
  url: "https://www.themoviedb.org/review/4",
};

export const mockMovieTrailersResponse: VideosApiResponse = {
  id: 603,
  results: [
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "'Down the Rabbit Hole' Clip",
      key: "clipKey",
      site: "YouTube",
      size: 1080,
      type: "Clip",
      official: true,
      published_at: "2024-04-03T16:19:27.000Z",
      id: "a123",
    },
    {
      iso_639_1: "en",
      iso_3166_1: "US",
      name: "Official 4K Trailer",
      key: "trailerKey",
      site: "YouTube",
      size: 2160,
      type: "Trailer",
      official: true,
      published_at: "2021-05-26T18:00:11.000Z",
      id: "z678",
    },
  ],
};

export const mockReviewApiResponse: ReviewsApiResponse = {
  id: 11,
  page: 1,
  results: [mockReviewResponse],
  total_pages: 1,
  total_results: 1,
};

export const mockSimilarMoviesApiResponse: SimilarMoviesApiResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "",
      genre_ids: [1],
      id: 106912,
      original_language: "en",
      original_title: "Darna! Ang Pagbabalik",
      overview:
        "Valentina, Darna's snake-haired arch enemy, is trying to take over the Phillipines through subliminal messages on religious TV shows. Darna has her own problems, however, as she has lost her magic pearl and with it the ability to transform into her scantily clad super self. Trapped as her alter-ego, the plucky reporter Narda, she must try to regain the pearl and foil Valentina's plans.",
      release_date: "1994-05-09",
      poster_path: "/posterabc.jpg",
      popularity: 1.012564,
      title: "Darna: The Return",
      video: false,
      vote_average: 7,
      vote_count: 0,
    },
  ],
  total_pages: 9,
  total_results: 168,
};
