import { useEffect, useState } from "react";

import { movieDbRequestInterceptor } from "../interceptors/movieDb.interceptor";
import { Genre } from "../models/movie.models";
import { GenreResponse } from "../models/movieResponse.models";
import { API } from "../utils/API";
import { createMapOfGenres } from "../utils/helpers/movie.helpers";

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre>({});

  useEffect(() => {
    movieDbRequestInterceptor(`${API.genre}`)
      .then((response) => response.json())
      .then(({ genres }: { genres: GenreResponse[] }) => {
        const mappedGenres = createMapOfGenres(genres);
        setGenres(mappedGenres);
      });
  }, []);

  return {
    genres,
  };
};
