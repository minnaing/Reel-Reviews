import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import MovieBox from "../../MovieBox/MovieBox";
import ReelSpinner from "../../Partials/ReelLogo/ReelSpinner";

import "./TrendBySeason.css";

const API_KEY = "ff0abd9e4de81e5a3e858b6b617453fa";
const BASE_URL = "https://api.themoviedb.org/3";

const animatedComponents = makeAnimated();

// Generate years array dynamically
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => ({
  value: currentYear - i,
  label: `${currentYear - i}`,
}));

const seasons = [
  { value: "spring", label: "Spring (Mar 1 - May 31)" },
  { value: "summer", label: "Summer (Jun 1 - Aug 31)" },
  { value: "fall", label: "Fall (Sep 1 - Nov 30)" }, // Adjusted the date range
  { value: "winter", label: "Winter (Dec 1 - Feb 28/29)" }, // Adjusted for clarity and accuracy
];

const trends = [
  { value: "trending", label: "Trending" },
  { value: "top_rated", label: "Top Rated" },
  { value: "popular", label: "Popular" },
];

const TrendBySeason = () => {
  const [movies, setMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedTrend, setSelectedTrend] = useState("popular");

  useEffect(() => {
    let url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;

    if (selectedTrend !== "trending") {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${selectedTrend}.desc&include_adult=false&include_video=false&page=1`;
      if (selectedYear) {
        url += `&primary_release_year=${selectedYear}`;
      }
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (selectedSeason) {
          const seasonDates = getSeasonDates(selectedSeason, selectedYear);
          const filteredMovies = data.results.filter(movie => {
            const movieDate = new Date(movie.release_date);
            return movieDate >= new Date(seasonDates.start) && movieDate <= new Date(seasonDates.end);
          });
          setMovies(filteredMovies);
        } else {
          setMovies(data.results);
        }
      })
      .catch(err => console.error("Error fetching data: " + err));
  }, [selectedYear, selectedTrend, selectedSeason]);


  return (
    <div id="review-wrapper">
      <div className="search-wrapper">
        <div className="filter-container">
          <Select
            options={seasons}
            onChange={(option) =>
              setSelectedSeason(option ? option.value : "spring")
            }
            placeholder="Select Season"
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
          />
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
          movies.map((movie) => <MovieBox key={movie.id} movieUrl={movie.poster_path} {...movie} />)
        ) : (
          <div className="reel-wrapper">
            <ReelSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get the season dates based on the selected year
function getSeasonDates(season, year) {
  switch (season) {
    case "spring":
      return { start: `${year}-03-01`, end: `${year}-05-31` };
    case "summer":
      return { start: `${year}-06-01`, end: `${year}-08-31` };
    case "fall":
      return { start: `${year}-09-01`, end: `${year}-12-30` }; // Adjusted the fall end date to Nov 30
    case "winter":
      // Handle wrapping year for winter
      return {
        start: `${year}-12-01`,
        end: `${year}-02-${year % 4 === 0 ? 29 : 28}`,
      };
    default:
      return null;
  }
}

export default TrendBySeason;
