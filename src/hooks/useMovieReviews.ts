import { useEffect, useState } from "react";

import { movieDbRequestInterceptor } from "../interceptors/movieDb.interceptor";
import { Review } from "../models/movie.models";
import { ReviewsApiResponse } from "../models/movieResponse.models";
import { apiBaseUrl } from "../utils/API";
import { mapReviewsToViewModel } from "../utils/helpers/movie.helpers";

export const useMovieReviews = (movieId: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    movieDbRequestInterceptor(`${apiBaseUrl}/movie/${movieId}/reviews?page=1`)
      .then((response) => response.json())
      .then((response: ReviewsApiResponse) => {
        const reviewsUI: Review[] = mapReviewsToViewModel(
          response.results?.slice(0, 2)
        );

        setReviews(reviewsUI);
      })
      .catch((err) => console.error(err));
  }, [movieId]);

  return { reviews };
};
