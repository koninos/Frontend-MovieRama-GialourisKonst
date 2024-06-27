import { useContext, useEffect, useState } from "react";

import { GenresContext } from "../../context/GenresContext";
import useToggle from "../../hooks/useToggle";
import { Movie, Review } from "../../models/movie.models";
import {
  ReviewsApiResponse,
  SimilarMoviesApiResponse,
  VideosApiResponse,
} from "../../models/movieResponse.models";
import Rating from "../../shared/rating/Rating";
import { ACCESS_TOKEN, API, API_KEY, apiBaseUrl } from "../../utils/API";
import {
  mapMoviesToViewModel,
  mapReviewsToViewModel,
} from "../../utils/helpers/movie.helpers";
import MovieDetails from "../movie-details/MovieDetails";
import css from "./MovieItem.module.scss";

interface MovieItemProps {
  movie: Movie;
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

function MovieItem({ movie }: Readonly<MovieItemProps>) {
  const { title, releaseDate, genre, rating, posterUrl, overview, id } = movie;

  const [showDetails, toggleShowDetails] = useToggle(false);
  const [trailerKey, setTrailerKey] = useState<string>("");
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const genres = useContext(GenresContext);

  useEffect(() => {
    if (showDetails) {
      const videoApi = `${apiBaseUrl}/movie/${id}/videos?api_key=${API_KEY}`;

      fetch(videoApi, options)
        .then((response) => response.json())
        .then((response: VideosApiResponse) => {
          const trailers = response.results.filter(
            (video) => video.type === "Trailer"
          );

          trailers.length && setTrailerKey(trailers[0].key);
        });
    }
  }, [id, showDetails]);

  useEffect(() => {
    if (showDetails) {
      fetch(`${apiBaseUrl}/movie/${id}/similar?page=1`, options)
        .then((response) => response.json())
        .then((response: SimilarMoviesApiResponse) => {
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
    <>
      <div className={css["movie-item"]} onClick={toggleShowDetails}>
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
      {showDetails && (
        <MovieDetails
          title={title}
          reviews={reviews}
          similarMovies={similarMovies}
          trailerKey={trailerKey}
        />
      )}
    </>
  );
}

export default MovieItem;
