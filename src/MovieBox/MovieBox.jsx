import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-box.css'

const API_IMG = "http://image.tmdb.org/t/p/w500";

const MovieBox = ({ title, poster_path, vote_average, release_date, overview }) => {
  const stars = Math.round(vote_average / 2); // Assuming vote_average is on a scale of 0-10

  // Function to render star icons based on the number of stars
  const renderStars = () => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <span key={i} className={i <= stars ? 'star-filled' : 'star-empty'}>
          &#9733; {/* Unicode character for a star */}
        </span>
      );
    }
    return starArray;
  };

  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={API_IMG + poster_path} alt="Movie Poster" />

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{overview}</Card.Text>
        <Card.Text>Release Date: {release_date}</Card.Text>
        <Card.Text>
          <span className="star-rating">{renderStars()}</span>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </>
  );
};

export default MovieBox;
