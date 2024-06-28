import { useEffect, useState } from "react";

import { VideosApiResponse } from "../models/movieResponse.models";
import { API_KEY, apiBaseUrl, GET_API_OPTIONS } from "../utils/API";

export const useMovieTrailers = (movieId: number) => {
  const [trailerKey, setTrailerKey] = useState<string>("");

  useEffect(() => {
    const videoApi = `${apiBaseUrl}/movie/${movieId}/videos?api_key=${API_KEY}`;

    fetch(videoApi, GET_API_OPTIONS)
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
