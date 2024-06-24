import css from './MovieItem.module.scss';

function MovieItem() {
  return (
    <li className={css["movie-item"]}>
      <div className={css.image}>Image</div>
      <div className={css.info}>
        <h3>Lord of the rings</h3>
        <div>2004</div>
        <div>Fantasy</div>
        <div>4.8</div>
      </div>
    </li>
  );
}

export default MovieItem;
