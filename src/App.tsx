import css from "./App.module.scss";
import MovieList from "./components/movie-list/MovieList";
import { GenresContext } from "./context/GenresContext";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import useMovies from "./hooks/useMovies";
import SearchBar from "./shared/search-bar/SearchBar";

export interface Search {
  term: string;
  page: number;
}

function App() {
  const { isLoading, error, genres, movies, setSearch, term, loadMoreMovies } =
    useMovies();

  const { ref: lastMovieElemRef } = useInfiniteScroll(
    isLoading,
    loadMoreMovies
  );

  return (
    <div className={css["app-shell"]}>
      <header className={css.heading}>
        <h1>{!term ? "Playing now in theaters" : `Results for: ${term}`}</h1>

        {error && <p>Error</p>}
      </header>

      <main className={css.container}>
        <SearchBar onChange={setSearch} />
        {isLoading && <p>Loading...</p>}
        <GenresContext.Provider value={genres}>
          <MovieList movies={movies} ref={lastMovieElemRef} />
        </GenresContext.Provider>
      </main>
    </div>
  );
}

export default App;
