import { useEffect, useState } from "react";

import useToggle from "../../hooks/useToggle";
import { Genre, Movie, Review } from "../../models/movie.models";
import {
  ReviewsApiResponse,
  SimilarMoviesApiResponse,
} from "../../models/movieResponse.models";
import Rating from "../../shared/rating/Rating";
import { ACCESS_TOKEN, API, API_KEY, apiBaseUrl } from "../../utils/API";
import {
  mapMoviesToViewModel,
  mapReviewsToViewModel,
} from "../../utils/helpers/movie.helpers";
import MovieShot from "../movie-shot/MovieShot";
import ReviewComponent from "../review/Review";
import Trailer from "../trailer/Trailer";
import css from "./MovieItem.module.scss";

interface MovieItemProps {
  movie: Movie;
  genres: Genre; // TODO remove after context
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

function MovieItem({ movie, genres }: Readonly<MovieItemProps>) {
  const {
    title,
    releaseDate,
    genre,
    rating,
    posterUrl,
    overview,
    hasTrailer,
    id,
  } = movie;

  const [showDetails, toggleShowDetails] = useToggle(false);
  const [trailerId, setTrailerId] = useState(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const videoApi = `${apiBaseUrl}/movie/${id}/videos?api_key=${API_KEY}`;

    const getMovieTrailers = async () => {
      const response = await fetch(videoApi);
      const apiResponse: any = await response.json();

      // TODO
      // setTrailerId for movies with trailer
      //Find a movie with trailer to check the response
    };

    if (showDetails && hasTrailer) {
      getMovieTrailers();
    }
  }, [hasTrailer, id, showDetails]);

  useEffect(() => {
    if (showDetails) {
      fetch(`${apiBaseUrl}/movie/${id}/similar?page=1`, options)
        .then((response) => response.json())
        .then((response: SimilarMoviesApiResponse) => {
          //TODO use context for genre
          const moviesUI: Movie[] = mapMoviesToViewModel(
            genres,
            response.results
          );

          setSimilarMovies(moviesUI);
        })
        .catch((err) => console.error(err));
    }
  }, [showDetails, genres, id]);

  useEffect(() => {
    if (showDetails) {
      fetch(`${apiBaseUrl}/movie/${id}/reviews?page=1`, options)
        .then((response) => response.json())
        .then((response: ReviewsApiResponse) => {
          const reviewsUI: Review[] = mapReviewsToViewModel(
            response.results?.slice(0, 2)
          );

          setReviews(reviewsUI);
        })
        .catch((err) => console.error(err));
    }
  }, [showDetails, id]);

  return (
    <li onClick={toggleShowDetails}>
      <div className={css["movie-item"]}>
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
          <p>{releaseDate}</p>
          <p>{genre}</p>
          <Rating value={rating} />
          <p>{overview}</p>
        </article>
      </div>
      {showDetails && (
        <div className={css["movie-details"]}>
          {trailerId && (
            <div className={css.trailer}>
              <Trailer embedId={trailerId} title="Test title" />
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
          {reviews && (
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
      )}
    </li>
  );
}

export default MovieItem;
