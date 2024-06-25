/* Server Models */
export interface MoviesApiResponse {
  page: number;
  results: MovieResponse[];
  dates: DateRangeResponse;
  total_pages: number;
  total_results: number;
}

interface DateRangeResponse {
  minimum: string;
  maximum: string;
}

export interface MovieResponse {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface GenreResponse {
  id: number;
  name: string;
}
