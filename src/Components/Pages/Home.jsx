// IMPORT useState AND useEffect HOOKS FROM REACT FOR STATE MANAGEMENT AND PERFORMING SIDE EFFECTS
import { useState, useEffect } from "react";

// IMPORT THE MovieBox COMPONENT TO DISPLAY INDIVIDUAL MOVIE DETAILS
import MovieBox from "../MovieBox/MovieBox";
// IMPORT THE SearchBox COMPONENT TO ALLOW USERS TO SEARCH FOR MOVIES
import SearchBox from "./../SearchBox/SearchBox";

// IMPORT STYLESHEET FOR STYLING THE PAGE COMPONENTS
import "./pages.css";

// DEFINE API URL FOR FETCHING POPULAR MOVIES FROM THE MOVIE DATABASE API
// const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

// DEFINE API KEY URL FOR FETCHING MOVIES BASED ON A SEARCH QUERY FROM THE MOVIE DATABASE API
const API_KEY = "https://api.themoviedb.org/3/search/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa";

// DEFINE THE Home COMPONENT
const Home = () => {
  
  // INITIALIZE STATE FOR STORING MOVIES ARRAY
  const [movies, setMovies] = useState([]);
  
  // INITIALIZE STATE FOR STORING THE CURRENT SEARCH QUERY
  const [searchQuery, setSearchQuery] = useState("");
  
  // FUNCTION TO HANDLE SEARCH OPERATION BY UPDATING THE SEARCHQUERY STATE
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // HOOK TO FETCH MOVIES BASED ON THE SEARCH QUERY WHENEVER THE SEARCHQUERY STATE CHANGES
  useEffect(() => {
    
    // CONDITION TO CHECK IF THE SEARCH QUERY IS NOT EMPTY
    if (searchQuery) {
      
      // PERFORM SEARCH IF searchQuery IS NOT EMPTY BY FETCHING DATA FROM THE API
      fetch(`${API_KEY}&query=${searchQuery}`)
        .then((res) => res.json()) // CONVERT THE RESPONSE TO JSON
        .then((data) => {
          
          // UPDATE THE MOVIES STATE WITH SEARCH RESULTS
          setMovies(data.results);
        });
    }
  }, [searchQuery]); // THIS EFFECT RUNS WHENEVER searchQuery CHANGES DUE TO THE DEPENDENCY ARRAY

  // RENDER THE COMPONENT
  return (
    <div>
      {/* CONTAINER FOR THE SEARCH BOX */}
      <div className="wrapper">
        <SearchBox onSearch={handleSearch} />
      </div>
      {/* DISPLAY THE PAGE TITLE */}
      <h2 style={{ textAlign: "center"}}>Movie Home</h2>
 
      {/* CONTAINER FOR DISPLAYING MOVIE BOXES OR A LOADING INDICATOR */}
      <div className="wrapper">
      {movies && movies.length > 0 ? (
        // MAP THROUGH THE MOVIES ARRAY AND RENDER A MovieBox FOR EACH MOVIE
        movies.map((movieRev) => <MovieBox key={movieRev.id} {...movieRev} />)
      ) : (
        // DISPLAY A LOADER SPAN IF NO MOVIES ARE LOADED
        <span className="loader"></span> 
      )}
      </div>
    </div>
  );
};

// EXPORT THE Home COMPONENT FOR USE IN OTHER PARTS OF THE APPLICATION
export default Home;
