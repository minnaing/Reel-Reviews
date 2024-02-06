import { useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
// import Footer from "react-bootstrap/Modal";

import "./movie-box.css";

const API_IMG = "http://image.tmdb.org/t/p/w500";

const MovieBox = ({ title, poster_path, vote_average, release_date, overview }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Assuming vote_average is on a scale of 0-10
  const stars = Math.round(vote_average / 2);

  // Function to render star icons based on the number of stars
  const renderStars = () => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <span key={i} className={i <= stars ? "star-filled" : "star-empty"}>
          &#9733; {/* Unicode character for a star */}
        </span>
      );
    }
    return starArray;
  };

  // URL for the placeholder image + Use the desired URL
  const placeholderImageUrl = "https://placehold.co/600x400?text=Hello\nWorld";

  // Filler text to display when overview is not available
  const fillerText = "No Description available."; // Customize as needed

  return (
    <>
      <Card style={{ width: "18rem" }}>
        {/* <Card.Img variant="top" src={API_IMG + poster_path} alt="Movie Poster" /> */}

        <Card.Img
          variant="top"
          src={poster_path ? `${API_IMG}${poster_path}` : placeholderImageUrl}
          alt={poster_path ? "Movie Poster" : "Placeholder Image"}
        />

        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text id="movie-desc">{overview ? overview : <h3>{fillerText}</h3>}</Card.Text>
          <Card.Text>Release Date: {release_date}</Card.Text>
          <Card.Text>
            <span className="star-rating">{renderStars()}</span>
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Go somewhere
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div id="modal-img">
                <img
                  variant="top"
                  src={poster_path ? `${API_IMG}${poster_path}` : placeholderImageUrl}
                  alt={poster_path ? "Movie Poster" : "Placeholder Image"}
                />
              </div>
              <h3>{title}</h3>
              <h4>
                <span className="star-rating">{renderStars()}</span>
              </h4>
              <h5>Release Date: {release_date}</h5>
              <h6 id="movie-desc">{overview ? overview : <h3>{fillerText}</h3>}</h6>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </>
  );
};

export default MovieBox;
