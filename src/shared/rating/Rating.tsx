import css from "./Rating.module.scss";

interface RatingProps {
  value: number;
}

function Rating({ value }: RatingProps) {
  return value ? <p className={css.rating}>{value.toFixed(1)}</p> : <></>;
}

export default Rating;
