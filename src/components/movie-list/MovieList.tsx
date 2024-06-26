import { useEffect, useState } from "react";

import { Genre, Movie } from "../../models/movie.models";
import { MoviesApiResponse } from "../../models/movieResponse.models";
import { ACCESS_TOKEN, API } from "../../utils/API";
import { mapMoviesToViewModel } from "../../utils/helpers/movie.helpers";
import MovieItem from "../movie-item/MovieItem";
import css from "./MovieList.module.scss";

interface MovieListProps {
  genres: Genre;
}

function MovieList({ genres }: Readonly<MovieListProps>) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    fetch(`${API.playingNow}?page=1`, options)
      .then((response) => response.json())
      .then((response: MoviesApiResponse) => {
        const moviesUI: Movie[] = mapMoviesToViewModel(
          genres,
          response.results
        );

        setMovies(moviesUI);
      })
      .catch((err) => console.error(err));
  }, [genres]);

  return (
    <div className={css.list}>
      <ul>
        {movies.map((m) => (
          <MovieItem key={m.id} movie={m} genres={genres} />
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
