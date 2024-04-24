import { useState, useEffect } from "react";
import Select from "react-select";
import MovieBox from "../../MovieBox/MovieBox";
import ReelSpinner from "../../Partials/ReelLogo/ReelSpinner";

import "./TrendBySeason.css";

const API_KEY = "ff0abd9e4de81e5a3e858b6b617453fa";
const BASE_URL = "https://api.themoviedb.org/3";

const years = [
  { value: 2022, label: "2022" },
  { value: 2023, label: "2023" },
  { value: 2024, label: "2024" },
];

const seasons = [
  { value: "spring", label: "Spring (Mar 1 - May 31)" },
  { value: "summer", label: "Summer (Jun 1 - Aug 31)" },
  { value: "fall", label: "Fall (Sep 1 - Nov 30)" },
  { value: "winter", label: "Winter (Dec 1 - Feb 29/28)" },
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
    let url = `${BASE_URL}/movie/${selectedTrend}?api_key=${API_KEY}&language=en-US&page=1`;

    if (selectedTrend === "trending") {
      url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.error("error:" + err));
  }, [selectedTrend]);

  return (
    <div id="review-wrapper">
      <div className="search-wrapper">
        <div className="filter-container">
          <Select
            options={years}
            onChange={(option) =>
              setSelectedYear(option ? option.value : new Date().getFullYear())
            }
            placeholder="Select Year"
            isClearable
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
      <h2 style={{ textAlign: "center" }}>Movie Reviews</h2>
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
