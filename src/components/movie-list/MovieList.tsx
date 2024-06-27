import { useEffect, useState } from "react";

import { Genre, Movie } from "../../models/movie.models";
import { MoviesApiResponse } from "../../models/movieResponse.models";
import { ACCESS_TOKEN, API } from "../../utils/API";
import { mapMoviesToViewModel } from "../../utils/helpers/movie.helpers";
import MovieItem from "../movie-item/MovieItem";
import css from "./MovieList.module.scss";

interface MovieListProps {
  genres: Genre;
  movies: Movie[];
}

function MovieList({ genres, movies }: Readonly<MovieListProps>) {
  return (
    <div className={css.list}>
      <ul>
        {movies.map((m) => (
          <li key={m.id}>
            <MovieItem movie={m} genres={genres} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
