/*

import React from "react";

function Search({ search, onSearchChange }) {

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={search}
        onChange={onSearchChange}
      />
    </div>
  );
}

export default Search;

*/
import React from "react";

function Search() {
    return (
        <div className="searchbar">
            <label htmlFor="search">Search Doors:</label>
            <input
                type="text"
                id="search"
                placeholder="Type to start searching..."
                />
        </div>
    );
}

export default Search;