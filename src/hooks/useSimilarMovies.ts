import { useContext, useEffect, useState } from "react";

import { GenresContext } from "../context/GenresContext";
import { movieDbRequestInterceptor } from "../interceptors/movieDb.interceptor";
import { Movie } from "../models/movie.models";
import { SimilarMoviesApiResponse } from "../models/movieResponse.models";
import { apiBaseUrl } from "../utils/API";
import { mapMoviesToViewModel } from "../utils/helpers/movie.helpers";

export const useSimilarMovies = (movieId: number) => {
  const genres = useContext(GenresContext);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  useEffect(() => {
    movieDbRequestInterceptor(`${apiBaseUrl}/movie/${movieId}/similar?page=1`)
      .then((response) => response.json())
      .then((response: SimilarMoviesApiResponse) => {
        const moviesUI: Movie[] = mapMoviesToViewModel(
          genres,
          response.results
        );

        setSimilarMovies(moviesUI);
      })
      .catch((err) => console.error(err));
  }, [genres, movieId]);

  return { similarMovies };
};
