/* UI Models */
export interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: number;
  genre: string;
  rating: number;
  posterUrl: string;
}

export interface Genre {
  [id: number]: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
}

export interface Search {
  term: string;
  page: number;
}
