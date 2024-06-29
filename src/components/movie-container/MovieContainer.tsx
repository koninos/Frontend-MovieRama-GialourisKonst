import { GenresContext } from "../../context/GenresContext";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useMovies } from "../../hooks/useMovies";
import { SearchBar } from "../../shared/search-bar/SearchBar";
import { Spinner } from "../../shared/spinner/Spinner";
import { MovieList } from "../movie-list/MovieList";
import css from "./MovieContainer.module.scss";

export const MovieContainer = () => {
  const { isLoading, error, genres, movies, setSearch, term, loadMoreMovies } =
    useMovies();

  const { ref: lastMovieElemRef } = useInfiniteScroll(
    isLoading,
    loadMoreMovies
  );

  return (
    <>
      <h2 className={css.header}>
        {!term ? "Playing now in theaters" : `Results for: ${term}`}
      </h2>

      {error && <p className={css.error}>Error</p>}

      <SearchBar onChange={setSearch} />

      {isLoading && <Spinner />}

      <GenresContext.Provider value={genres}>
        <MovieList movies={movies} ref={lastMovieElemRef} />
      </GenresContext.Provider>
    </>
  );
};
