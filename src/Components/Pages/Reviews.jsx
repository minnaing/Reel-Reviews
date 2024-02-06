import React, { useState, useEffect } from "react";

import MovieBox from "../MovieBox/MovieBox";
import SearchBox from "./../SearchBox/SearchBox";

import "./pages.css";

// API URL FOR FIRST HOOK
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

// API KEY FOR SECOND HOOK { searchQuery }
const API_KEY = "https://api.themoviedb.org/3/search/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa";

// const BASE_URL = "https://api.themoviedb.org/3";

const Reviews = () => {
  
  // INITIALIZE STATE FOR STORING THE MOVIES + CURRENT SEARCH QUERY
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // FUNCTION TO HANDLE SEARCH OPERATION BY UPDATING THE SEARCHQUERY STATE
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // USEEFFECT HOOK TO FETCH AND DISPLAY ALL MOVIES WHEN THE COMPONENT MOUNTS OR THE API_URL CHANGES
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // UPDATE THE MOVIES STATE WITH FETCHED DATA
        setMovies(data.results);
      });
  }, []); // EMPTY DEPENDENCY ARRAY MEANS THIS EFFECT RUNS ONCE AFTER INITIAL RENDER

  // // USEEFFECT HOOK TO FETCH MOVIES BASED ON THE SEARCH QUERY WHENEVER THE SEARCHQUERY STATE CHANGES
  useEffect(() => {
    if (searchQuery) {

      // ONLY PERFORM SEARCH IF searchQuery IS NOT EMPTY
      fetch(`${API_KEY}&query=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {

          // UPDATE THE MOVIES STATE WITH SEARCH RESULTS
          setMovies(data.results);
        });
    }
  }, [searchQuery]); 
      // DEPENDENCY ARRAY WITH searchQuery MEANS THIS EFFECT RUNS WHENEVER searchQuery CHANGES

  return (
    <div>
      <div className="wrapper">
        <SearchBox onSearch={handleSearch} />
      </div>
      <h2 style={{ textAlign: "center"}}>Movie Reviews</h2>
      
      <div className="wrapper">
        {movies && movies.length > 0 ? (
          movies.map((movieRev) => <MovieBox key={movieRev.id} {...movieRev} />)
        ) : (
          <span className="loader"></span> // SHOW LOADER IF NO MOVIES ARE LOADED
        )}
      </div>
    </div>
  );
};

export default Reviews;
