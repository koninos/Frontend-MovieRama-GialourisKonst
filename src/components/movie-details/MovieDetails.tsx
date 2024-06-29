import { useMovieReviews } from "../../hooks/useMovieReviews";
import { useMovieTrailers } from "../../hooks/useMovieTrailers";
import { useSimilarMovies } from "../../hooks/useSimilarMovies";
import { Spinner } from "../../shared/spinner/Spinner";
import { MovieShot } from "../movie-shot/MovieShot";
import { Review as ReviewComponent } from "../review/Review";
import Trailer from "../trailer/Trailer";
import css from "./MovieDetails.module.scss";

interface MovieDetailsProps {
  id: number;
  title: string;
}

export const MovieDetails = ({ id, title }: MovieDetailsProps) => {
  const { trailerKey } = useMovieTrailers(id);
  const { similarMovies } = useSimilarMovies(id);
  const { reviews } = useMovieReviews(id);

  const contentLoaded =
    !!trailerKey || similarMovies.length > 0 || reviews.length > 0;

  return (
    <>
      <section className={css["movie-details"]} data-testid="movie-details">
        {!contentLoaded && <Spinner />}
        {trailerKey && (
          <section className={css.trailer}>
            <Trailer videoId={trailerKey} title={title} />
          </section>
        )}
        {similarMovies.length > 0 && (
          <section className={css["similar-movies"]}>
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
          </section>
        )}
        {reviews.length > 0 && (
          <section className={css.reviews}>
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
          </section>
        )}
      </section>
    </>
  );
};
