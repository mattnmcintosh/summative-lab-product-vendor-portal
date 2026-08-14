import { useRef, useEffect } from "react";

function Search({ query, onSearchChange }) {

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

    return (
        <div className="searchbar">
            <label htmlFor="search">Search Doors: </label>
            <input
                type="text"
                id="search"
                placeholder="Type to start searching..."
                ref={inputRef}
                value={query}
                onChange={(e) => onSearchChange(e.target.value)}
                />
        </div>
    );
}

export default Search;

