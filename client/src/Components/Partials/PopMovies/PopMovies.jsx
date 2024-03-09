import { useEffect, useState } from "react";

import './pop-movies.css'

// // DEFINE API URL FOR FETCHING POPULAR MOVIES FROM THE MOVIE DATABASE API
const BASE_URL = "https://api.themoviedb.org/3";

// // DEFINE API KEY URL FOR FETCHING MOVIES BASED ON A SEARCH QUERY FROM THE MOVIE DATABASE API
const API_KEY = "ff0abd9e4de81e5a3e858b6b617453fa";

const PopMovies = () => {
  // State for storing popular movies
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    // Fetch popular movies on component mount
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        setPopularMovies(data.results.slice(0, 10)); // Take the first 10 popular movies
      });
  }, []);

  return (
    <div>
      {/* Displaying popular movies */}
      <div className="popular-movies">
        <h2 style={{ textAlign: "center" }}>Popular Movies</h2>
        <div className="movie-grid">
          {popularMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                className="pop-movies"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopMovies;
