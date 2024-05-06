import { useState, useEffect } from "react";
import Select from "react-select"; // Import react-select

import MovieBox from "../../MovieBox/MovieBox";
import SearchBox from "../../SearchBox/SearchBox";
import ReelSpinner from "../../Partials/ReelLogo/ReelSpinner";

import "./reviews.css";

const API_KEY = "ff0abd9e4de81e5a3e858b6b617453fa";
const BASE_URL = "https://api.themoviedb.org/3";

const API_URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

const Reviews = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [generationFilter, setGenerationFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const generationCategories = {
    "Ages 0 -> 11": { startYear: 2013, endYear: 2024 },
    "Ages 12 -> 29": { startYear: 1995, endYear: 2012 },
    "Ages 30 -> 44": { startYear: 1980, endYear: 1994 },
    "Ages 45 -> 59": { startYear: 1965, endYear: 1979 },
    "Ages 60 -> 78": { startYear: 1946, endYear: 1964 },
    "Ages 79 -> 99": { startYear: 1925, endYear: 1945 },
    "Ages 100 -> 123": { startYear: 1901, endYear: 1924 },
  };

  const generationOptions = Object.keys(generationCategories).map((key) => ({
    value: key,
    label: key,
  }));

  const ratingOptions = [
    { value: "good", label: "Good (> 3 stars)" },
    { value: "bad", label: "Bad (≤ 3 stars)" },
  ];

  const handleGenerationChange = (selected) => {
    setGenerationFilter(selected ? selected.value : "");
  };

  const handleRatingChange = (selected) => {
    setRatingFilter(selected ? selected.value : "");
  };

  const filteredMovies = movies.filter((movie) => {
    const releaseYear = movie.release_date ? parseInt(movie.release_date.split("-")[0], 10) : 0;
    return (
      (!generationFilter ||
        (releaseYear >= generationCategories[generationFilter].startYear &&
          releaseYear <= generationCategories[generationFilter].endYear)) &&
      (!ratingFilter || (ratingFilter === "good" ? movie.vote_average > 3 : movie.vote_average <= 3))
    );
  });

  console.log(filteredMovies); // Check if movieUrl is present and correct

  // FUNCTION TO HANDLE SEARCH OPERATION BY UPDATING THE SEARCHQUERY STATE
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const enhancedMovies = data.results.map((movie) => ({
          ...movie,
          movieUrl: `${BASE_URL}/${movie.id}`,
        }));
        setMovies(enhancedMovies);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const searchURL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
      fetch(searchURL)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results || []);
        })
        .catch((error) => console.error("Error searching movies:", error));
    }
  }, [searchQuery, API_KEY]);

  return (
    <div id="review-wrapper">
      <div className="search-wrapper">
        <SearchBox onSearch={handleSearch} />

        <div className="filter-container">
          <Select
            value={generationOptions.find((option) => option.value === generationFilter)}
            onChange={handleGenerationChange}
            options={generationOptions}
            placeholder="Select Age Generation"
            isClearable={true}
            className="react-select-container"
            classNamePrefix="react-select"
          />
          <Select
            value={ratingOptions.find((option) => option.value === ratingFilter)}
            onChange={handleRatingChange}
            options={ratingOptions}
            placeholder="Select Rating"
            isClearable={true}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>
      <h2 style={{ textAlign: "center" }}>Movie Reviews</h2>
      <div className="wrapper">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => <MovieBox key={movie.id} {...movie} />)
        ) : (
          <div className="review-container-1">
            <ReelSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
