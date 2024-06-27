import { useEffect, useState } from "react";

import css from "./App.module.scss";
import MovieList from "./components/movie-list/MovieList";
import { GenresContext } from "./context/GenresContext";
import useDebounce from "./hooks/useDebounce";
import { Genre, Movie } from "./models/movie.models";
import {
  GenreResponse,
  MoviesApiResponse,
} from "./models/movieResponse.models";
import SearchBar from "./shared/search-bar/SearchBar";
import { ACCESS_TOKEN, API, API_KEY } from "./utils/API";
import {
  createMapOfGenres,
  mapMoviesToViewModel,
} from "./utils/helpers/movie.helpers";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

function App() {
  const [genres, setGenres] = useState<Genre>({});
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const debouncedSearch = useDebounce(searchValue);

  useEffect(() => {
    const getData = async () => {
      const moviesApiUrl = !debouncedSearch
        ? `${API.playingNow}?page=1`
        : `${API.searchMovie}?query=${debouncedSearch}&page=1`;

      const responses = await Promise.all([
        fetch(`${API.genre}?api_key=${API_KEY}`),
        fetch(moviesApiUrl, options),
      ]);

      const { genres }: { genres: GenreResponse[] } = await responses[0].json();
      const moviesResponse: MoviesApiResponse = await responses[1].json();

      const mappedGenres = createMapOfGenres(genres);
      setGenres(mappedGenres);

      const moviesUI: Movie[] = mapMoviesToViewModel(
        mappedGenres,
        moviesResponse.results
      );

      setMovies(moviesUI);
    };

    getData();
  }, [debouncedSearch]);

  return (
    <div className={css["app-shell"]}>
      <header className={css.heading}>
        <h1>
          {!debouncedSearch
            ? "Playing now in theaters"
            : `Search results for: ${debouncedSearch}`}
        </h1>
      </header>

      <main className={css.container}>
        <SearchBar onChange={setSearchValue} />
        <GenresContext.Provider value={genres}>
          <MovieList movies={movies} />
        </GenresContext.Provider>
      </main>
    </div>
  );
}

export default App;
