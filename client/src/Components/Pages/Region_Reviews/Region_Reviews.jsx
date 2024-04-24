// import { useState, useEffect } from "react";
// import Select from "react-select"; // Import react-select

// import MovieBox from "../../MovieBox/MovieBox";
// import SearchBox from "../../SearchBox/SearchBox";
// import ReelSpinner from "../../Partials/ReelLogo/ReelSpinner";

// import "./region_reviews.css";

// // API URL FOR FIRST HOOK
// const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

// // API KEY FOR SECOND HOOK { searchQuery }
// const API_KEY =
//   "https://api.themoviedb.org/3/search/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa";

// // const API_Key_Num = 'ff0abd9e4de81e5a3e858b6b617453fa'

// const BASE_URL = "https://api.themoviedb.org/3";

// const Region_Reviews = () => {
//   // INITIALIZE STATE FOR STORING THE MOVIES + CURRENT SEARCH QUERY
//   const [movies, setMovies] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // New: states for countries and regions
//   const [countries, setCountries] = useState([]);
//   const [countryFilter, setCountryFilter] = useState("");

//   // Add State for the Rating Filter
//   const [ratingFilter, setRatingFilter] = useState("");

//   // ||||||||||||||||||| CHANGED CODE |||||||||||||||||||||||||

//   /*
//   const generationOptions = Object.keys(generationCategories).map(
//     (generation) => ({
//       value: generation,
//       label: generation,
//     })
//   );
//   */

//   const ratingOptions = [
//     { value: "good", label: "Good (> 3 stars)" },
//     { value: "bad", label: "Bad (≤ 3 stars)" },
//   ];

//   /*
//   const handleGenerationChange = (selectedOption) => {
//     setGenerationFilter(selectedOption ? selectedOption.value : "");
//   };
//   */

//   const handleRatingChange = (selectedOption) => {
//     setRatingFilter(selectedOption ? selectedOption.value : "");
//   };

//   // ||||||||||||||||||| CHANGED CODE END |||||||||||||||||||||||

//   // Implement the Rating Filter Logic
//   const filteredMovies = movies.filter((movie) => {
//     const releaseYear = movie.release_date
//       ? parseInt(movie.release_date.split("-")[0])
//       : 0;
//     // const generationFilterPass =
//     //   !generationFilter ||
//     //   (releaseYear >= generationCategories[generationFilter]?.startYear &&
//     //     releaseYear <= generationCategories[generationFilter]?.endYear);

//     let ratingFilterPass = true;
//     if (ratingFilter === "good") {
//       ratingFilterPass = movie.vote_average > 3;
//     } else if (ratingFilter === "bad") {
//       ratingFilterPass = movie.vote_average <= 3;
//     }

//     return ratingFilterPass;
//   });

//   console.log(filteredMovies); // Check if movieUrl is present and correct

//   // FUNCTION TO HANDLE SEARCH OPERATION BY UPDATING THE SEARCHQUERY STATE
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   // New: Fetch countries and regions inside useEffect
//   useEffect(() => {
//     const fetchCountries = async () => {
//       const res = await fetch(
//         "https://api.themoviedb.org/3/configuration/countries?language=en-US",
//         {
//           method: "GET",
//           headers: {
//             accept: "application/json",
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjBhYmQ5ZTRkZTgxZTVhM2U4NThiNmI2MTc0NTNmYSIsInN1YiI6IjY1YmE0ZTk5MzNhMzc2MDBjNTg1NjE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XSukbZfkYComwtA2KF70vxLNOugSW1kL4qJSIP0WAIg",
//           },
//         }
//       );
//       const data = await res.json();
//       setCountries(
//         data.map((country) => ({
//           value: country.iso_3166_1,
//           label: country.english_name,
//         }))
//       );
//     };

//     fetchCountries();
//   }, []);

//   // USEEFFECT HOOK TO FETCH AND DISPLAY ALL MOVIES WHEN THE COMPONENT MOUNTS OR THE API_URL CHANGES
//   useEffect(() => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then(async (data) => {
//         console.log(data);

//         const moviesWithUrls = await Promise.all(
//           data.results.map(async (movie) => {
//             // Placeholder for fetching movie URLs
//             // You need to replace this with actual logic to fetch URLs
//             const movieUrl = `${BASE_URL}${movie.id}`;
//             return { ...movie, movieUrl };
//           })
//         );

//         // UPDATE THE MOVIES STATE WITH FETCHED DATA
//         // setMovies(data.results);
//         setMovies(moviesWithUrls);
//       });
//   }, []); // EMPTY DEPENDENCY ARRAY MEANS THIS EFFECT RUNS ONCE AFTER INITIAL RENDER

//   useEffect(() => {
//     if (searchQuery) {
//       // ONLY PERFORM SEARCH IF searchQuery IS NOT EMPTY
//       fetch(`${API_KEY}&query=${searchQuery}`)
//         .then((res) => res.json())
//         .then((data) => {
//           // UPDATE THE MOVIES STATE WITH SEARCH RESULTS
//           setMovies(data.results);
//         });
//     }
//   }, [searchQuery]);
//   // DEPENDENCY ARRAY WITH searchQuery MEANS THIS EFFECT RUNS WHENEVER searchQuery CHANGES

//   return (
//     <div id="review-wrapper">
//       <div className="search-wrapper">
//         <SearchBox onSearch={handleSearch} />

//         {/* Add UI Elements for Generation Filter */}
//         <div className="filter-container">
//           {/* <select value={generationFilter} onChange={(e) => setGenerationFilter(e.target.value)}>
//             <option value="">Select Generation</option>
//             {Object.keys(generationCategories).map((generation) => (
//               <option key={generation} value={generation}>
//                 {generation}
//               </option>
//             ))}
//           </select> */}

//           {/* Add UI for Rating Filter */}
//           {/* <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
//             <option value="">Select Rating</option>
//             <option value="good">Good (&gt; 3 stars)</option>
//             <option value="bad">Bad (≤ 3 stars)</option>
//           </select> */}

//           {/* GENERATION FILTER */}
//           {/*
//           <Select
//             value={generationOptions.find(
//               (option) => option.value === generationFilter
//             )}
//             onChange={handleGenerationChange}
//             options={generationOptions}
//             placeholder="Select Generation"
//             isClearable={true}
//             className="react-select-container"
//             classNamePrefix="react-select"
//           />
//           */}

//           {/*New: COUNTRIES FILTER */}
//           <Select
//             value={countries.find((option) => option.value === countryFilter)}
//             onChange={(selectedOption) =>
//               setCountryFilter(selectedOption ? selectedOption.value : "")
//             }
//             options={countries}
//             placeholder="Select Country"
//             isClearable={true}
//             className="react-select-container"
//             classNamePrefix="react-select"
//           />

//           {/* RATING FILTER */}
//           <Select
//             value={ratingOptions.find(
//               (option) => option.value === ratingFilter
//             )}
//             onChange={handleRatingChange}
//             options={ratingOptions}
//             placeholder="Select Rating"
//             isClearable={true}
//             className="react-select-container"
//             classNamePrefix="react-select"
//           />
//         </div>
//       </div>
//       <h2 style={{ textAlign: "center" }}>Movie Reviews</h2>

//       <div className="wrapper">
//         {filteredMovies.length > 0 ? (
//           filteredMovies.map((movieRev) => {
//             return (
//               <MovieBox
//                 key={movieRev.id}
//                 {...movieRev}
//                 movieUrl={movieRev.movieUrl}
//               />
//             );
//           })
//         ) : (
//           <div className="reel-wrapper">
//             {/* CALL REELSPINNER WHEN NO MOVIE IS FOUND */}
//             <ReelSpinner />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Region_Reviews;

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
  const [searchQuery, setSearchQuery] = useState("");
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
        <SearchBox onSearch={setSearchQuery} />
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

export default Region_Reviews;
