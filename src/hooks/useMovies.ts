import { useEffect, useRef, useState } from "react";

import { movieDbRequestInterceptor } from "../interceptors/movieDb.interceptor";
import { Genre, Movie, Search } from "../models/movie.models";
import {
  GenreResponse,
  MoviesApiResponse,
} from "../models/movieResponse.models";
import { API } from "../utils/API";
import {
  createMapOfGenres,
  mapMoviesToViewModel,
} from "../utils/helpers/movie.helpers";
import { useDebounce } from "./useDebounce";

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [genres, setGenres] = useState<Genre>({});
  const [search, setSearch] = useState<Search>({ term: "", page: 1 });
  const [movies, setMovies] = useState<Movie[]>([]);
  const debouncedSearch = useDebounce(search.term);
  const totalPages = useRef(0);

  const hasMorePages = search.page < totalPages.current;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const moviesApiUrl = !debouncedSearch
          ? `${API.playingNow}?page=${search.page}`
          : `${API.searchMovie}?query=${debouncedSearch}&page=${search.page}`;

        const responses = await Promise.all([
          movieDbRequestInterceptor(`${API.genre}`),
          movieDbRequestInterceptor(moviesApiUrl),
        ]);

        const { genres }: { genres: GenreResponse[] } =
          await responses[0].json();
        const moviesResponse: MoviesApiResponse = await responses[1].json();

        totalPages.current = moviesResponse.total_pages;

        const mappedGenres = createMapOfGenres(genres);
        setGenres(mappedGenres);

        const moviesUI: Movie[] = mapMoviesToViewModel(
          mappedGenres,
          moviesResponse.results
        );

        setMovies((prevMovies) => {
          if (search.page > 1) {
            return [...prevMovies, ...moviesUI];
          }
          return moviesUI;
        });

        setIsLoading(false);
      } catch (err) {
        setError(true);
      }
    };

    getData();
  }, [debouncedSearch, search.page]);

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
