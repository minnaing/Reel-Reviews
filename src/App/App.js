import { useState, useEffect } from 'react';

// IMPORT COMPONENTS
import MovieBox from './../MovieBox/MovieBox';
import SearchBox from './../SearchBox/SearchBox'; // Import the SearchBox component

// import logo from "./../logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const API_KEY = 'https://api.themoviedb.org/3/search/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa'; // Replace with your API key

// const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=ff0abd9e4de81e5a3e858b6b617453fa&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  // useEffect(() => {
  //   fetch(API_URL)
  //   .then((res) => res.json())
  //   .then(data => {
  //     console.log(data)
  //     setMovies(data.results)
  //   })
  // }, [])

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
      {/* <img src={logo} className="App-logo" alt="logo" /> */}

      <h1>Reel Reviews</h1>

      <SearchBox onSearch={handleSearch} />

      {movies && movies.length > 0 ? (
        movies.map((movieRev) => <MovieBox key={movieRev.id} {...movieRev} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
