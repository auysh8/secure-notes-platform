import { useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.css";
import { useHotkeys } from "react-hotkeys-hook";

interface SearchBarProps {
  input: (value: string) => void;
}

const SearchBar = ({ input }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      input(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, input]);
  const inputRef = useRef<HTMLInputElement>(null);
  useHotkeys("ctrl+slash", () => inputRef.current?.focus(), {
    preventDefault: true,
    enableOnFormTags: true,
  });
  return (
    <div className={styles.search_bar}>
      <input
        ref={inputRef}
        className={styles.input_area}
        type="text"
        placeholder="Search notes"
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
