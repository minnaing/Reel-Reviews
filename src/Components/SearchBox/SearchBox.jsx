// IMPORT REACT AND THE useState HOOK FROM THE 'react' PACKAGE
import React, { useState } from 'react';

// DEFINE A FUNCTIONAL COMPONENT NAMED SearchBox THAT ACCEPTS AN onSearch PROP
const SearchBox = ({ onSearch }) => {
  
  // INITIALIZE STATE NAMED query WITH AN EMPTY STRING AND A FUNCTION TO UPDATE IT
  const [query, setQuery] = useState('');

  // DEFINE A FUNCTION TO HANDLE THE SEARCH OPERATION
  const handleSearch = () => {
    
    // CALL THE onSearch FUNCTION PASSED AS A PROP WITH THE CURRENT query VALUE
    onSearch(query);
  };

  // DEFINE A FUNCTION TO HANDLE KEY PRESS EVENTS IN THE INPUT FIELD
  const handleKeyPress = (e) => {
    
    // CHECK IF THE PRESSED KEY IS THE ENTER KEY
    if (e.key === 'Enter') {
      
      // CALL THE handleSearch FUNCTION WHEN ENTER KEY IS PRESSED
      handleSearch();
    }
  };

  // RENDER THE COMPONENT
  return (
    <div>
      
      {/* RENDER AN INPUT FIELD FOR THE SEARCH QUERY */}
      <input
        
        // SET THE INPUT TYPE TO TEXT
        type="text" 

        // SET A PLACEHOLDER FOR THE INPUT FIELD
        placeholder="Search for movies..."
        
        // BIND THE INPUT VALUE TO THE query STATE 
        value={query} 
        
        // UPDATE THE query STATE WHEN THE INPUT CHANGES
        onChange={(e) => setQuery(e.target.value)}
        
        // ADD AN EVENT LISTENER FOR KEY PRESS EVENTS
        onKeyPress={handleKeyPress} 
      />
      {/* RENDER A BUTTON TO TRIGGER THE SEARCH OPERATION */}
      <button onClick={handleSearch}>Search</button> 
      {/* // CALL handleSearch WHEN THE BUTTON IS CLICKED */}
    </div>
  );
};

// EXPORT THE SearchBox COMPONENT FOR USE IN OTHER PARTS OF THE APPLICATION
export default SearchBox;
