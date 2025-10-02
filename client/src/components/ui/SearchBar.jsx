import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // You'll need to install react-icons
import styles from "./SearchBar.module.css";

// Note: You'll need to install react-icons: `npm install react-icons`

const SearchBar = ({
  onSearch,
  placeholder = "Search events...",
  className = "",
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      className={`${styles.searchBar} ${className}`}
      onSubmit={handleSubmit}
      role="search"
      {...props}
    >
      <input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.searchInput}
        aria-label={placeholder}
      />
      <button type="submit" className={styles.searchButton} aria-label="Search">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
