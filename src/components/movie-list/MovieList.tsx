import MovieItem from '../movie-item/MovieItem';
import css from './Movie.module.scss';

function MovieList() {
  return (
    <div className={css.list}>
      List of movies
      <ul>
        {[1, 2, 3, 4].map((m, idx) => (
          <MovieItem key={idx} />
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
