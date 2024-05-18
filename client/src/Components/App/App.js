// IMPORT useState AND useEffect HOOKS FROM REACT FOR STATE MANAGEMENT AND SIDE EFFECTS
import { useState, useEffect } from "react";

// IMPORT BROWSERROUTER, ROUTES, AND ROUTE FROM REACT-ROUTER-DOM FOR ROUTING
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import classNames from "classnames";

// IMPORT SEARCHBOX COMPONENT THAT ALLOWS USERS TO SEARCH FOR MOVIES
import NavbarBar from "../Navbar/NavbarBar"; // Update path as needed
// import StickyNav from "./../Navbar/StickyNav"; // Update path as needed

import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import ChatRoom from "../Pages/ChatRoom/ChatRoom";
import Contact from "../Pages/Contact/Contact";
import MovieChart from "../Partials/MovieChart/MovieChart";
import MovieLocMap from "../Pages/MovieLocMap/MovieLocMap";
// import MovieReviewForm from "../Pages/MovieReviewForm/MovieReviewForm";
import Reviews from "../Pages/Reviews/Reviews";
import Region_Reviews from "../Pages/Region_Reviews/Region_Reviews";
import TrendBySeason from "../Pages/TrendBySeason/TrendBySeason";

// IMPORT THE (ReelSpinner) COMPONENT TO DISPLAY FOR NO MOVIES
import Footer from "../Partials/Footer/Footer";

// IMPORT BOOTSTRAP'S STYLESHEET FOR STYLING COMPONENTS ACCORDING TO THE BOOTSTRAP FRAMEWORK
import "bootstrap/dist/css/bootstrap.min.css";

// IMPORT CUSTOM CSS FOR STYLING THE APPLICATION
import "./App.css";

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
      {/* <StickyNav /> */}
      <NavbarBar />
      <div className="content-wrapper">
        {/* // WRAPPER FOR DISPLAYING MOVIE BOXES OR A LOADER IF MOVIES ARE NOT YET LOADED */}
        <Routes>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/chatroom" element={<ChatRoom />} />

          <Route path="/geo-loc" element={<MovieLocMap />} />
          <Route path="/chart" element={<MovieChart />} />
          <Route path="/reviews" element={<Reviews movies={movies} />} />
          <Route path="/region_reviews" element={<Region_Reviews />} />
          <Route path="/TrendBySeason" element={<TrendBySeason />} />
          {/* <Route path="/get-reviews" element={<MovieReviewForm />} /> */}
          {/* Add other routes */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

// EXPORT THE APP COMPONENT FOR USE IN THE APPLICATION
export default App;
