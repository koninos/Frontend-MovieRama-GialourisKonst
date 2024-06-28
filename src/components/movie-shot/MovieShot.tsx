import { Rating } from "../../shared/rating/Rating";
import css from "./MovieShot.module.scss";

interface MovieShotProps {
  posterUrl: string;
  rating: number;
  title: string;
}

export const MovieShot = ({ posterUrl, rating, title }: MovieShotProps) => {
  return (
    <section className={css.container}>
      <img
        src={`https://image.tmdb.org/t/p/w185/${posterUrl}`}
        alt="Movie poster"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = "./assets/image-not-found.webp";
        }}
      />

      <Rating value={rating} />
      <p className={css.title}>{title}</p>
    </section>
  );
};
