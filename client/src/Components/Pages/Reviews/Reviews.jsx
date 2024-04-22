import { useState, useEffect } from "react";
import Select from 'react-select'; // Import react-select

import MovieBox from "../../MovieBox/MovieBox";
import SearchBox from "../../SearchBox/SearchBox";
import ReelSpinner from "../../Partials/ReelLogo/ReelSpinner";

import "./reviews.css";

// API URL FOR FIRST HOOK
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

// API KEY FOR SECOND HOOK { searchQuery }
const API_KEY = "https://api.themoviedb.org/3/search/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa";

// const API_Key_Num = 'ff0abd9e4de81e5a3e858b6b617453fa'

const BASE_URL = "https://api.themoviedb.org/3";

const Reviews = () => {
  // INITIALIZE STATE FOR STORING THE MOVIES + CURRENT SEARCH QUERY
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Add State for the Generation Filter
  const [generationFilter, setGenerationFilter] = useState("");

  // Add State for the Rating Filter
  const [ratingFilter, setRatingFilter] = useState("");

  // Define Generation Categories
  const generationCategories = {
    "Gen Z": { startYear: 2000, endYear: 2020 },
    Millennials: { startYear: 1980, endYear: 1999 },
    "Gen X": { startYear: 1965, endYear: 1979 },
    "Baby Boomers": { startYear: 1946, endYear: 1964 },
    "Silent Generation": { startYear: 1928, endYear: 1945 },
  };

  // ||||||||||||||||||| CHANGED CODE |||||||||||||||||||||||||
  const generationOptions = Object.keys(generationCategories).map((generation) => ({
    value: generation,
    label: generation,
  }));

  const ratingOptions = [
    { value: 'good', label: 'Good (> 3 stars)' },
    { value: 'bad', label: 'Bad (≤ 3 stars)' },
  ];

  const handleGenerationChange = (selectedOption) => {
    setGenerationFilter(selectedOption ? selectedOption.value : '');
  };

  const handleRatingChange = (selectedOption) => {
    setRatingFilter(selectedOption ? selectedOption.value : '');
  };

  // ||||||||||||||||||| CHANGED CODE END |||||||||||||||||||||||

  // Implement the Rating Filter Logic
  const filteredMovies = movies.filter((movie) => {
    const releaseYear = movie.release_date ? parseInt(movie.release_date.split("-")[0]) : 0;
    const generationFilterPass =
      !generationFilter ||
      (releaseYear >= generationCategories[generationFilter]?.startYear &&
        releaseYear <= generationCategories[generationFilter]?.endYear);

    let ratingFilterPass = true;
    if (ratingFilter === "good") {
      ratingFilterPass = movie.vote_average > 3;
    } else if (ratingFilter === "bad") {
      ratingFilterPass = movie.vote_average <= 3;
    }

    return generationFilterPass && ratingFilterPass;
  });

  console.log(filteredMovies); // Check if movieUrl is present and correct

  // FUNCTION TO HANDLE SEARCH OPERATION BY UPDATING THE SEARCHQUERY STATE
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // USEEFFECT HOOK TO FETCH AND DISPLAY ALL MOVIES WHEN THE COMPONENT MOUNTS OR THE API_URL CHANGES
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);

        const moviesWithUrls = await Promise.all(data.results.map(async (movie) => {
          // Placeholder for fetching movie URLs
          // You need to replace this with actual logic to fetch URLs
          const movieUrl = `${BASE_URL}${movie.id}`;
          return { ...movie, movieUrl };
        }));

        // UPDATE THE MOVIES STATE WITH FETCHED DATA
        // setMovies(data.results);
        setMovies(moviesWithUrls);
      });
  }, []); // EMPTY DEPENDENCY ARRAY MEANS THIS EFFECT RUNS ONCE AFTER INITIAL RENDER
  
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
    <div id="review-wrapper">
      <div className="search-wrapper">
        <SearchBox onSearch={handleSearch} />

        {/* Add UI Elements for Generation Filter */}
        <div className="filter-container">
          {/* <select value={generationFilter} onChange={(e) => setGenerationFilter(e.target.value)}>
            <option value="">Select Generation</option>
            {Object.keys(generationCategories).map((generation) => (
              <option key={generation} value={generation}>
                {generation}
              </option>
            ))}
          </select> */}

          {/* Add UI for Rating Filter */}
          {/* <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
            <option value="">Select Rating</option>
            <option value="good">Good (&gt; 3 stars)</option>
            <option value="bad">Bad (≤ 3 stars)</option>
          </select> */}

          {/* GENERATION FILTER */}
          <Select
            value={generationOptions.find(option => option.value === generationFilter)}
            onChange={handleGenerationChange}
            options={generationOptions}
            placeholder="Select Generation"
            isClearable={true}
            className="react-select-container"
            classNamePrefix="react-select"
          />
          {/* RATING FILTER */}
          <Select
            value={ratingOptions.find(option => option.value === ratingFilter)}
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
          filteredMovies.map((movieRev) => {
            return <MovieBox className="cards" key={movieRev.id} {...movieRev} movieUrl={movieRev.movieUrl} />})
        ) : (
          <div>
            {/* CALL REELSPINNER WHEN NO MOVIE IS FOUND */}
            <ReelSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
