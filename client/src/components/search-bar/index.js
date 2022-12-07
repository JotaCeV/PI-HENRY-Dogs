import React from "react";
import "./search-bar.css";

function SearchBar(props) {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Buscar raza..."
        onChange={(e) => props.onSearch(e.target.value)}
      />
    </div>
  );
}

export { SearchBar };
