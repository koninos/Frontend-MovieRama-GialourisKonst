import { Search } from "../../models/movie.models";
import css from "./SearchBar.module.scss";

interface SearchBarProps {
  onChange: (value: Search) => void;
}

export const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <input
      className={css.search}
      type="text"
      placeholder="Search"
      onChange={(e) =>
        onChange({
          term: e.target.value,
          page: 1,
        })
      }
    />
  );
};
