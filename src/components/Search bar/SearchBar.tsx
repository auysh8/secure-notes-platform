import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({input}) => {
  return (
    <div className={styles.search_bar}>
      <input className={styles.input_area} type="text" placeholder="Search notes" onChange={(e) => input(e.target.value)} />
    </div>
  );
};

export default SearchBar;
