import css from "./App.module.scss";
import { MovieContainer } from "./components/movie-container/MovieContainer";

export const App = () => {
  return (
    <main className={css["app-shell"]}>
      <header className={css.heading}>
        <h1>MovieRama</h1>
      </header>

      <section className={css.container}>
        <MovieContainer />
      </section>
    </main>
  );
};
