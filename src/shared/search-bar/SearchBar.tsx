import css from "./SearchBar.module.scss";

interface SearchBarProps {
  onChange: (value: string) => void;
}

function SearchBar({ onChange }: SearchBarProps) {
  return (
    <input
      className={css.search}
      type="text"
      placeholder="Search"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
