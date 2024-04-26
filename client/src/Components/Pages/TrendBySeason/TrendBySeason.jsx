import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

import MovieBox from "../../MovieBox/MovieBox";
import ReelSpinner from "../../Partials/ReelLogo/ReelSpinner";

import "./TrendBySeason.css";

const API_KEY = "ff0abd9e4de81e5a3e858b6b617453fa";
const BASE_URL = "https://api.themoviedb.org/3";

// Generate years array dynamically
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => ({
  value: currentYear - i,
  label: `${currentYear - i}`,
}));

const seasons = [
  { value: "spring", label: "Spring (Mar 1 - May 31)" },
  { value: "summer", label: "Summer (Jun 1 - Aug 31)" },
  { value: "fall", label: "Fall (Sep 1 - Dec 30)" },
  { value: "winter", label: "Winter (Jan 1 - Feb 29/28)" },
];

const trends = [
  { value: "trending", label: "Trending" },
  { value: "top_rated", label: "Top Rated" },
  { value: "popular", label: "Popular" },
];

const TrendBySeason = () => {
  const [movies, setMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedTrend, setSelectedTrend] = useState("trending");

  useEffect(() => {
    let url;
    let clientSideFilteringNeeded = false;
  
    if (selectedTrend === "trending") {
      url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
      clientSideFilteringNeeded = true; // Mark that client-side filtering will be needed
    } else {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${selectedTrend}.desc&include_adult=false&include_video=false&page=1`;
      if (selectedYear) {
        url += `&primary_release_year=${selectedYear}`;
      }
    }
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (clientSideFilteringNeeded && selectedYear) {
          // Filter movies by release year after fetching them
          const filteredMovies = data.results.filter(movie => {
            const releaseYear = new Date(movie.release_date).getFullYear();
            return releaseYear === selectedYear;
          });
          setMovies(filteredMovies);
        } else {
          setMovies(data.results);
        }
      })
      .catch(err => console.error("Error fetching data: " + err));
  }, [selectedYear, selectedTrend]);
  
  return (
    <div id="review-wrapper">
      <div className="search-wrapper">
        <div className="filter-container">
          <CreatableSelect
            isClearable
            components={animatedComponents}
            options={years}
            onChange={(option) => {
              const year = option
                ? parseInt(option.value, 10)
                : new Date().getFullYear();
              console.log("Selected Year: ", year); // Debug: Check the console for the selected year
              setSelectedYear(year);
            }}
            placeholder="Select or type a year"
            className="react-select-container"
            classNamePrefix="react-select"
          />
          <Select
            options={trends}
            onChange={(option) =>
              setSelectedTrend(option ? option.value : "trending")
            }
            placeholder="Select Trend"
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>
      <h2 style={{ textAlign: "center" }}>Movie Reviews By Trend Of Season</h2>
      <div className="wrapper">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieBox key={movie.id} {...movie} />)
        ) : (
          <div className="reel-wrapper">
            <ReelSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendBySeason;
