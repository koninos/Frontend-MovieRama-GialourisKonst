import { useEffect, useState } from 'react';

import { Genre, Movie } from '../../models/movie.models';
import { MoviesApiResponse } from '../../models/movieResponse.models';
import { mapMoviesToViewModel } from '../../utils/helpers/movie.helpers';
import MovieItem from '../movie-item/MovieItem';
import css from './Movie.module.scss';

interface MovieListProps {
  genres: Genre;
}

function MovieList({ genres }: Readonly<MovieListProps>) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getPlayingNowMovies = async () => {
      const response = await fetch("./dummyData/playingNow.json");
      const apiResponse: MoviesApiResponse = await response.json();

      const moviesUI: Movie[] = mapMoviesToViewModel(
        genres,
        apiResponse.results
      );

      setMovies(moviesUI);
    };

    getPlayingNowMovies();
  }, []);

  return (
    <div className={css.list}>
      <ul>
        {movies.map((m) => (
          <MovieItem movie={m} key={m.id} />
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
