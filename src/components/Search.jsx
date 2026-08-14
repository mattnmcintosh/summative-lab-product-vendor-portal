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