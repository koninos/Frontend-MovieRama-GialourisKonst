import { forwardRef } from "react";

import { Movie } from "../../models/movie.models";
import MovieItem from "../movie-item/MovieItem";
import css from "./MovieList.module.scss";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = forwardRef(function MovieList(
  { movies }: Readonly<MovieListProps>,
  ref
) {
  return (
    <div className={css.list}>
      <ul>
        {movies.map((m, idx) => (
          <li key={m.id}>
            <MovieItem
              movie={m}
              isLastMovieInPage={movies.length === idx + 1}
              ref={ref}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default MovieList;
