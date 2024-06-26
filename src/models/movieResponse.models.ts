/* Server Models */
export interface MoviesApiResponse {
  page: number;
  results: MovieResponse[];
  dates: DateRangeResponse;
  total_pages: number;
  total_results: number;
}

export interface ReviewsApiResponse {
  id: number;
  page: number;
  results: ReviewResponse[];
  total_pages: number;
  total_results: number;
}

export interface SimilarMoviesApiResponse {
  page: number;
  results: MovieResponse[];
  total_pages: number;
  total_results: number;
}

export interface VideosApiResponse {
  id: number;
  results: VideoResponse[];
}

interface VideoResponse {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

interface DateRangeResponse {
  minimum: string;
  maximum: string;
}

export interface MovieResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface GenreResponse {
  id: number;
  name: string;
}

export interface ReviewResponse {
  author: string;
  author_details: ReviewAuthorResponse;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface ReviewAuthorResponse {
  name: string;
  username: string;
  avatar_path: string;
  rating: number;
}
