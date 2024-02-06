import { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar"; // Import Navbar
import Nav from "react-bootstrap/Nav"; // Import Nav
import Container from "react-bootstrap/Container"; // Import Container

// IMPORT COMPONENTS
import MovieBox from "./../MovieBox/MovieBox";
import SearchBox from "./../SearchBox/SearchBox"; // Import the SearchBox component

// import logo from "./../logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// FIRST HOOK
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

// FIRST HOOK { searchQuery }
const API_KEY = "https://api.themoviedb.org/3/search/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa"; // Replace with your API key

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // THIS HOOK DISPLAYS ALL MOVIES TO THE PAGE
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  // THIS HOOK DISPLAYS ALL SEARCHED MOVIES TO THE PAGE
  useEffect(() => {
    if (searchQuery) {
      fetch(`${API_KEY}&query=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#">Reel Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <SearchBox onSearch={handleSearch} />
      </div>

      <div className="wrapper">
        {movies && movies.length > 0 ? (
          movies.map((movieRev) => <MovieBox key={movieRev.id} {...movieRev} />)
        ) : (
          <span className="loader"></span>
        )}
      </div>
    </div>
  );
};

export default App;
