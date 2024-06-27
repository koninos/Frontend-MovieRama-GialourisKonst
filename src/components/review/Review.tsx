import { Rating } from "../../shared/rating/Rating";
import css from "./Review.module.scss";

interface ReviewProps {
  author: string;
  rating: number;
  content: string;
}

export const Review = ({ author, content, rating }: ReviewProps) => {
  return (
    <div className={css.review}>
      <div className={css["user-rating"]}>
        <p className={css.author}>
          <span className={css.tag}>Review</span>
          {author}
        </p>
        <div className={css.rating}>
          <Rating value={rating} />
        </div>
      </div>
      <p className={css.content}>{content}</p>
    </div>
  );
};
