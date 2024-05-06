import { useState, useEffect } from "react";
import Select from "react-select";

import MovieBox from "../../MovieBox/MovieBox";
import SearchBox from "../../SearchBox/SearchBox";
import ReelSpinner from "../../Partials/ReelLogo/ReelSpinner";

import "./region_reviews.css";

const API_KEY = "ff0abd9e4de81e5a3e858b6b617453fa";
const BASE_URL = "https://api.themoviedb.org/3";

const Region_Reviews = () => {
  const [movies, setMovies] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [nowPlaying, setNowPlaying] = useState(false);

  // Fetch countries on component mount
  useEffect(() => {
    fetch(`${BASE_URL}/configuration/countries?api_key=${API_KEY}`, {
      headers: { accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setCountries(
          data.map((country) => ({
            value: country.iso_3166_1,
            label: country.english_name,
          }))
        );
      });
  }, []);

  // Fetch movies based on filters
  useEffect(() => {
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&sort_by=popularity.desc`;
    if (nowPlaying) {
      url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`;
    }
    if (countryFilter) {
      url += `&region=${countryFilter}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, [countryFilter, nowPlaying]); // Fetch movies when these dependencies change

  return (
    <div id="review-wrapper">
      <div className="search-wrapper">
        {/* <SearchBox onSearch={setSearchQuery} /> */}
        <div className="filter-container">
          <Select
            options={countries}
            value={countries.find((option) => option.value === countryFilter)}
            onChange={(option) => setCountryFilter(option ? option.value : "")}
            placeholder="Select Country"
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
          />
          <button onClick={() => setNowPlaying(!nowPlaying)}>
            {nowPlaying ? "Show All Movies" : "Show Now Playing"}
          </button>
        </div>
      </div>
      <h2 style={{ textAlign: "center" }}>Movie Review By Region</h2>
      <div className="wrapper">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieBox 
            key={movie.id} 
            movieUrl={`https://image.tmdb.org/t/p/original${movie.poster_path}`}  // Assuming 'poster_path' is available and correct
            {...movie} />)
        ) : (
          <div className="reel-wrapper">
            <ReelSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Region_Reviews;
