import { useContext, useEffect, useState } from "react";

import { GenresContext } from "../context/GenresContext";
import { Movie } from "../models/movie.models";
import { SimilarMoviesApiResponse } from "../models/movieResponse.models";
import { apiBaseUrl, GET_API_OPTIONS } from "../utils/API";
import { mapMoviesToViewModel } from "../utils/helpers/movie.helpers";

export const useSimilarMovies = (movieId: number) => {
  const genres = useContext(GenresContext);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/movie/${movieId}/similar?page=1`, GET_API_OPTIONS)
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
