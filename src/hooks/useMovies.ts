import { useEffect, useRef, useState } from "react";

import { movieDbRequestInterceptor } from "../interceptors/movieDb.interceptor";
import { Movie, Search } from "../models/movie.models";
import { MoviesApiResponse } from "../models/movieResponse.models";
import { API } from "../utils/API";
import { mapMoviesToViewModel } from "../utils/helpers/movie.helpers";
import { useDebounce } from "./useDebounce";
import { useGenres } from "./useGenres";

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState<Search>({ term: "", page: 1 });
  const [movies, setMovies] = useState<Movie[]>([]);
  const debouncedSearch = useDebounce(search.term);
  const totalPages = useRef(0);
  const { genres } = useGenres();

  const hasMorePages = search.page < totalPages.current;

  useEffect(() => {
    setIsLoading(true);

    const moviesApiUrl = !debouncedSearch
      ? `${API.playingNow}?page=${search.page}`
      : `${API.searchMovie}?query=${debouncedSearch}&page=${search.page}`;

    movieDbRequestInterceptor(moviesApiUrl)
      .then((response) => response.json())
      .then((moviesResponse: MoviesApiResponse) => {
        totalPages.current = moviesResponse.total_pages;

        const moviesUI: Movie[] = mapMoviesToViewModel(
          genres,
          moviesResponse.results
        );

        setMovies((prevMovies) => {
          if (search.page > 1) {
            return [...prevMovies, ...moviesUI];
          }
          return moviesUI;
        });

        setIsLoading(false);
      })
      .catch((error) => setError(true));
  }, [debouncedSearch, search.page, genres]);

  const loadMoreMovies = () => {
    if (hasMorePages) {
      setSearch((prevSearch) => ({ ...prevSearch, page: prevSearch.page + 1 }));
    }
  };

  return {
    isLoading,
    error,
    genres,
    movies,
    loadMoreMovies,
    setSearch,
    term: search.term,
  };
};
