import { useEffect, useState } from "react";

import { movieDbRequestInterceptor } from "../interceptors/movieDb.interceptor";
import { VideosApiResponse } from "../models/movieResponse.models";
import { apiBaseUrl } from "../utils/API";

export const useMovieTrailers = (movieId: number) => {
  const [trailerKey, setTrailerKey] = useState<string>("");

  useEffect(() => {
    const videoApi = `${apiBaseUrl}/movie/${movieId}/videos`;

    movieDbRequestInterceptor(videoApi)
      .then((response) => response.json())
      .then((response: VideosApiResponse) => {
        const trailers = response.results.filter(
          (video) => video.type === "Trailer"
        );

        trailers.length && setTrailerKey(trailers[0].key);
      });
  }, [movieId]);

  return { trailerKey };
};
