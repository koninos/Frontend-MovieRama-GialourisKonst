import { useEffect, useState } from 'react';

import css from './App.module.scss';
import MovieList from './components/movie-list/MovieList';
import { Genre } from './models/movie.models';
import { GenreResponse } from './models/movieResponse.models';
import { createMapOfGenres } from './utils/helpers/movie.helpers';

function App() {
  const [genres, setGenres] = useState<Genre>({});

  useEffect(() => {
    const getGenres = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=bc50218d91157b1ba4f142ef7baaa6a0"
      );
      const apiResponse: { genres: GenreResponse[] } = await response.json();

      const mappedGenres = createMapOfGenres(apiResponse.genres);
      setGenres(mappedGenres);
    };

    getGenres();
  }, []);

  return (
    <div className={css["app-shell"]}>
      <header className={css.heading}>
        <h1>Playing now in theaters</h1>
      </header>

      <main className={css.container}>
        <div>
          <input type="text" name="search" placeholder="Search movie" />
        </div>
        {Object.keys(genres).length > 0 && <MovieList genres={genres} />}
      </main>
    </div>
  );
}

export default App;
