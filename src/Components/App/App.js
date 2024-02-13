// IMPORT useState AND useEffect HOOKS FROM REACT FOR STATE MANAGEMENT AND SIDE EFFECTS
import { useState, useEffect } from "react";

// IMPORT BROWSERROUTER, ROUTES, AND ROUTE FROM REACT-ROUTER-DOM FOR ROUTING
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// IMPORT SEARCHBOX COMPONENT THAT ALLOWS USERS TO SEARCH FOR MOVIES
import NavbarBar from "./../Navbar/NavbarBar"; // Update path as needed
import Home from "./../Pages/Home";
import About from './../Pages/About';
import Contact from './../Pages/Contact';
import Reviews from "./../Pages/Reviews";
import MovieChart from "../Partials/MovieChart"

// IMPORT BOOTSTRAP'S STYLESHEET FOR STYLING COMPONENTS ACCORDING TO THE BOOTSTRAP FRAMEWORK
import "bootstrap/dist/css/bootstrap.min.css";

// IMPORT CUSTOM CSS FOR STYLING THE APPLICATION
import "./App.css";

//
// const API_IMG = "http://image.tmdb.org/t/p/w500";

// FIRST HOOK
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

// FIRST HOOK { searchQuery }
const API_KEY = "https://api.themoviedb.org/3/search/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa";

// DEFINE THE MAIN APP COMPONENT
const App = () => {
  // // INITIALIZE STATE FOR STORING MOVIES ARRAY
  const [movies, setMovies] = useState([]);

  // INITIALIZE STATE FOR STORING THE CURRENT SEARCH QUERY
  const [searchQuery] = useState("");

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

  // RENDER THE APPLICATION UI
  return (
    <Router>
      <div className="App">
        <NavbarBar />

        {/* // WRAPPER FOR DISPLAYING MOVIE BOXES OR A LOADER IF MOVIES ARE NOT YET LOADED */}
        <Routes>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chart" element={<MovieChart />} />
          <Route path="/reviews" element={<Reviews movies={movies} />} />
          {/* Add other routes */}
        </Routes>
      </div>
    </Router>
  );
};

// EXPORT THE APP COMPONENT FOR USE IN THE APPLICATION
export default App;
