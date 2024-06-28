import { forwardRef } from "react";

import { useToggle } from "../../hooks/useToggle";
import { Movie } from "../../models/movie.models";
import { Rating } from "../../shared/rating/Rating";
import { API } from "../../utils/API";
import { MovieDetails } from "../movie-details/MovieDetails";
import css from "./MovieItem.module.scss";

interface MovieItemProps {
  movie: Movie;
  isLastMovieInPage: boolean;
}

export const MovieItem = forwardRef(function MovieItem(
  { movie, isLastMovieInPage }: Readonly<MovieItemProps>,
  ref: any
) {
  const { title, releaseDate, genre, rating, posterUrl, overview, id } = movie;

  const [showDetails, toggleShowDetails] = useToggle(false);

  return (
    <>
      <div
        className={css["movie-item"]}
        onClick={toggleShowDetails}
        ref={isLastMovieInPage ? ref : null}
      >
        <div className={css.image}>
          <img
            src={`${API.posterBaseUrl}${posterUrl}`}
            alt={`Movie poster ${title}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "./assets/image-not-found.jpg";
              currentTarget.alt = "Poster not found";
            }}
          />
        </div>
        <article className={css.info}>
          <h3>{title}</h3>
          <p>{isNaN(releaseDate) ? "" : releaseDate}</p>
          <p>{genre}</p>
          <Rating value={rating} />
          <p>{overview}</p>
        </article>
      </div>
      {showDetails && <MovieDetails id={id} title={title} />}
    </>
  );
});
