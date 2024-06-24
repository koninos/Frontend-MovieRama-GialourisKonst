import css from './App.module.scss';
import MovieList from './components/movie-list/MovieList';

function App() {
  return (
    <div className={css["app-shell"]}>
      <header className={css.heading}>
        <h1>Playing now in theaters</h1>
      </header>

      <main className={css.container}>
        <div>
          <input type="text" name="search" placeholder="Search movie" />
        </div>
        <MovieList />
      </main>
    </div>
  );
}

export default App;
