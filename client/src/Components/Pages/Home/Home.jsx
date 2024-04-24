// IMPORT (useState) AND (useEffect) HOOKS FROM REACT FOR STATE MANAGEMENT AND PERFORMING SIDE EFFECTS
import { useState, useEffect } from "react";

// IMPORT THE SearchBox COMPONENT TO ALLOW USERS TO SEARCH FOR MOVIES
import SearchBox from "../../SearchBox/SearchBox";

// IMPORT THE (MovieChart) COMPONENT TO ALLOW USERS TO SEARCH FOR MOVIES
import MovieChart from "../../Partials/MovieChart/MovieChart";

// IMPORT THE (PopMovies) COMPONENT TO ALLOW USERS TO SEARCH FOR MOVIES
import PopMovies from "../../Partials/PopMovies/PopMovies";

// IMPORT THE (ReelSpinner) COMPONENT TO DISPLAY FOR NO MOVIES
import ReelSpinner from "../../Partials/ReelLogo/ReelSpinner";

// IMPORT STYLESHEET FOR STYLING THE PAGE COMPONENTS
import "./home.css";

// DEFINE API URL FOR FETCHING POPULAR MOVIES FROM THE MOVIE DATABASE API
const BASE_URL = "https://api.themoviedb.org/3";

// DEFINE API KEY URL FOR FETCHING MOVIES BASED ON A SEARCH QUERY FROM THE MOVIE DATABASE API
const API_KEY = "ff0abd9e4de81e5a3e858b6b617453fa";

// DEFINE THE Home COMPONENT
const Home = () => {
  // INITIALIZE STATE FOR STORING THE CURRENT SEARCH QUERY
  const [searchQuery, setSearchQuery] = useState("");

  // STATE FOR STORING VIDEO KEY FOR THE TRAILER
  const [videoKey, setVideoKey] = useState("");

  // State to store the title of the movie
  const [movieTitle, setMovieTitle] = useState("");

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  // FUNCTION TO HANDLE SEARCH OPERATION BY UPDATING THE SEARCHQUERY STATE
  const handleSearch = (query) => {
    setSearchQuery(query);

    // Reset movie title on new search
    setMovieTitle("");

    // Trigger loading state on new search
    setIsLoading(true);
  };

  useEffect(() => {
    // DEFINED ( fetchTrailer ) WITHIN ( useEffect ) TO AVOID MISSING DEPENDENCIES
    const fetchTrailer = (movieId) => {
      fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          const trailer = data.results.find((video) => video.type === "Trailer");
          if (trailer) {
            setVideoKey(trailer.key);

            // DATA LOADED, LOADING COMPLETE
            setIsLoading(false);
          } else {
            // Handle no trailer available
            setVideoKey("");
            setMovieTitle("Trailer Not Available");

            // No trailer found, loading complete
            setIsLoading(false);
          }
        });
    };

    if (!searchQuery) {
      // Fetch a default movie trailer on initial load
      // Replace with a default movie ID
      const defaultMovieId = "550";
      fetchTrailer(defaultMovieId);
    } else {
      // Fetch movies based on the search query
      fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.results.length > 0) {
            const firstMovie = data.results[0];

            // Update the title with the first movie's title
            setMovieTitle(firstMovie.title);

            // Fetch trailer of the first movie
            fetchTrailer(firstMovie.id);
          } else {
            // Handle no search results
            setVideoKey("");
            setMovieTitle("Trailer Not Available");

            // No search results, loading complete
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch movies", error);
          setVideoKey("");
          setMovieTitle("Failed to load data");
          setIsLoading(false);
        });
    }
  }, [searchQuery]); // No need to add fetchTrailer to the dependencies array as it's defined within useEffect

  // RENDER THE COMPONENT
  return (
    <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
      {/* CONTAINER FOR THE SEARCH BOX */}
      <div className="wrapper">
        <SearchBox onSearch={handleSearch} />
      </div>

      {/* DISPLAY THE PAGE TITLE */}
      {/* Update the heading to dynamically display the movie title */}
      <h2 className="name-of-search-wrapper" style={{ textAlign: "center" }}>
        Name Of Search:
        <p className="rainbow-brite">{movieTitle || "Movie Home"}</p>
      </h2>

      {/* CONTAINER FOR DISPLAYING MOVIE BOXES OR A LOADING INDICATOR */}
      <div className="trailer-container">
        {isLoading ? (
          <ReelSpinner />
        ) : videoKey ? (
          <div id="video-iframe" style={{ overflow: "hidden" }}>
            <iframe
              style={{ width: "100%", height: "100%" }}
              src={`https://www.youtube.com/embed/${videoKey}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={movieTitle || "Movie Trailer"}
            ></iframe>
          </div>
        ) : (
          <div className="reel-wrapper">
            {/* This is displayed if there is no video key and loading is done */}
            <ReelSpinner />
          </div>
        )}
        <br />
      </div>

      {/* PARTIALS OF PAGE */}
      <MovieChart />
      <PopMovies />
    </div>
  );
};

// EXPORT THE Home COMPONENT FOR USE IN OTHER PARTS OF THE APPLICATION
export default Home;
