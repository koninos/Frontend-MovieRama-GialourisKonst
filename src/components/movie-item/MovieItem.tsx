import { Movie } from '../../models/movie.models';
import css from './MovieItem.module.scss';

interface MovieItemProps {
  movie: Movie;
}

function MovieItem({ movie }: Readonly<MovieItemProps>) {
  const { title, releaseDate, genre, rating, posterUrl, overview } = movie;

  //TODO
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  return (
    <li className={css["movie-item"]}>
      <div className={css.image}>
        <img
          src={`${baseUrl}${posterUrl}`}
          alt="Movie poster"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "./assets/image-not-found.jpg";
          }}
        />
      </div>
      <article className={css.info}>
        <h3>{title}</h3>
        <p>{releaseDate}</p>
        <p>{genre}</p>
        <p className={css.rating}>{rating}</p>
        <p>{overview}</p>
      </article>
    </li>
  );
}

export default MovieItem;
