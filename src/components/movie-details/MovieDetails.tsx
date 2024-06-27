import { Movie, Review } from "../../models/movie.models";
import { MovieShot } from "../movie-shot/MovieShot";
import { Review as ReviewComponent } from "../review/Review";
import Trailer from "../trailer/Trailer";
import css from "./MovieDetails.module.scss";

interface MovieDetailsProps {
  title: string;
  trailerKey: string;
  similarMovies: Movie[];
  reviews: Review[];
}

export const MovieDetails = ({
  title,
  trailerKey,
  similarMovies,
  reviews,
}: MovieDetailsProps) => {
  return (
    <div className={css["movie-details"]}>
      {trailerKey && (
        <div className={css.trailer}>
          <Trailer videoId={trailerKey} title={title} />
        </div>
      )}
      {similarMovies.length > 0 && (
        <div className={css["similar-movies"]}>
          <h3>Similar movies</h3>
          <ul>
            {/* //TODO Display just first 5 */}
            {similarMovies.slice(0, 5).map((m) => (
              <li key={m.id}>
                <MovieShot
                  posterUrl={m.posterUrl}
                  rating={m.rating}
                  title={m.title}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {reviews.length > 0 && (
        <div className={css.reviews}>
          <ul>
            {reviews.map((r) => {
              return (
                <li key={r.id}>
                  <ReviewComponent
                    author={r.author}
                    rating={r.rating}
                    content={r.content}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
