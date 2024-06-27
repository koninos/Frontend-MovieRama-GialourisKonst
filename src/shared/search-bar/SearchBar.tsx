import { Search } from "../../App";
import css from "./SearchBar.module.scss";

interface SearchBarProps {
  onChange: (value: Search) => void;
}

function SearchBar({ onChange }: SearchBarProps) {
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
}

export default SearchBar;
