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
