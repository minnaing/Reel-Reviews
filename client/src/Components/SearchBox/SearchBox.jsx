// IMPORT REACT AND THE useState HOOK FROM THE 'react' PACKAGE
import { useState } from "react";

import PropTypes from "prop-types";

// STYLING FOR SEARC BOX
import "./search-box.css";

// DEFINE A FUNCTIONAL COMPONENT NAMED SearchBox THAT ACCEPTS AN onSearch PROP
const SearchBox = ({ onSearch }) => {
  // INITIALIZE STATE NAMED query WITH AN EMPTY STRING AND A FUNCTION TO UPDATE IT
  const [query, setQuery] = useState("");

  // DEFINE A FUNCTION TO HANDLE THE SEARCH OPERATION
  const handleInputChange = (e) => {
    // CALL THE onSearch FUNCTION PASSED AS A PROP WITH THE CURRENT ("query") VALUE
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Perform search as you type
  };

  // RENDER THE COMPONENT
  return (
    <div id="search-body">
      <div className="search-container">
        {/* RENDER AN INPUT FIELD FOR THE SEARCH QUERY */}
        <input
          className="search-input"
          // SET THE INPUT TYPE TO TEXT
          type="text"
          // SET A PLACEHOLDER FOR THE INPUT FIELD
          placeholder="Search for movies..."
          // BIND THE INPUT VALUE TO THE query STATE
          value={query}
          // UPDATE THE query STATE WHEN THE INPUT CHANGES
          // onChange={(e) => setQuery(e.target.value)}
          onChange={handleInputChange} // Updated to use handleInputChange
        />
        <a href="#" className="search-btn">
          <i className="fas fa-search"></i>
        </a>

        {/* RENDER A BUTTON TO TRIGGER THE SEARCH OPERATION */}
        {/* <button onClick={handleSearch}>Search</button>  */}
        {/* // CALL handleSearch WHEN THE BUTTON IS CLICKED */}
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

// EXPORT THE SearchBox COMPONENT FOR USE IN OTHER PARTS OF THE APPLICATION
export default SearchBox;
