import { useEffect, useState } from "react";

import css from "./App.module.scss";
import MovieList from "./components/movie-list/MovieList";
import { Genre } from "./models/movie.models";
import { GenreResponse } from "./models/movieResponse.models";
import { API, API_KEY } from "./utils/API";
import { createMapOfGenres } from "./utils/helpers/movie.helpers";

function App() {
  const [genres, setGenres] = useState<Genre>({});

  useEffect(() => {
    fetch(`${API.genre}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((response: { genres: GenreResponse[] }) => {
        const mappedGenres = createMapOfGenres(response.genres);
        setGenres(mappedGenres);
      })
      .catch((err) => console.error(err));
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
