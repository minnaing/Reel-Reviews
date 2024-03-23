// IMPORTING USESTATE HOOK FROM REACT FOR COMPONENT STATE MANAGEMENT
import { useState } from "react";

// IMPORTING BUTTON AND CARD COMPONENTS FROM REACT-BOOTSTRAP FOR UI DESIGN
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// IMPORTING THE MOVIEMODAL COMPONENT FOR DISPLAYING MOVIE DETAILS IN A MODAL
import MovieModal from "./MovieModal";

// IMPORTING STYLESHEET FOR THE MOVIEBOX COMPONENT
import "./movie-box.css";

// DEFINING A CONSTANT FOR THE BASE URL OF MOVIE POSTER IMAGES
const API_IMG = "http://image.tmdb.org/t/p/w500";

// DEFINING THE MOVIEBOX FUNCTIONAL COMPONENT WITH PROPS FOR MOVIE DETAILS
const MovieBox = ({ title, poster_path, vote_average, release_date, overview, movieUrl }) => {
  console.log("Received props:", { title, poster_path, vote_average, release_date, overview, movieUrl });

  // DEFINING A STATE HOOK FOR CONTROLLING THE VISIBILITY OF THE MOVIE MODAL
  const [show, setShow] = useState(false);

  // FUNCTION TO OPEN THE MODAL BY SETTING THE 'SHOW' STATE TO TRUE
  const handleShow = () => setShow(true);

  // FUNCTION TO CLOSE THE MODAL BY SETTING THE 'SHOW' STATE TO FALSE
  const handleClose = () => setShow(false);

  // CALCULATING THE NUMBER OF STARS FOR RATING BASED ON THE VOTE AVERAGE, ASSUMING A SCALE OF 0-10
  const stars = Math.round(vote_average / 2);

  // FUNCTION TO RENDER STAR ICONS BASED ON THE CALCULATED NUMBER OF STARS
  const renderStars = () => {
    // CREATE AN EMPTY ARRAY
    const starArray = [];

    // LOOPING THROUGH A FIXED NUMBER OF STARS (5) AND PUSHING FILLED OR EMPTY STARS BASED ON THE RATING
    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <span key={i} className={i <= stars ? "star-filled" : "star-empty"}>
          &#9733; {/* UNICODE CHARACTER FOR A STAR */}
        </span>
      );
    }
    return starArray;
  };

  // DEFINING A PLACEHOLDER IMAGE URL FOR USE WHEN NO POSTER PATH IS PROVIDED
  const placeholderImageUrl = "https://placehold.co/600x400?text=No Image Available";

  // DEFINING A FILLER TEXT TO DISPLAY WHEN NO MOVIE OVERVIEW IS AVAILABLE
  const fillerText = "No Description available."; // THIS TEXT CAN BE CUSTOMIZED AS NEEDED

  // // HANDLE CLICK ON THE IMAGE TO NAVIGATE TO THE MOVIE OR TRAILER URL
  // const navigateToMovie = (event) => {
  //   // PREVENT ANY PARENT EVENT HANDLERS FROM BEING EXECUTED
  //   event.stopPropagation();

  //   console.log(`Navigating to movie URL: ${movieUrl}`); // Debug log

  //   // ENSURE MOVIEURL IS NOT EMPTY OR UNDEFINED
  //   if (movieUrl) {
  //     window.open(movieUrl, "_blank");
  //   } else {
  //     // ADDITIONAL DEBUG INFO IF ( movieUrl ) IS MISSING
  //     console.error("No movie URL provided");
  //   }
  // };

  // RENDERING THE CARD COMPONENT TO DISPLAY MOVIE INFORMATION
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={poster_path ? `${API_IMG}${poster_path}` : placeholderImageUrl}
          // CONDITIONALLY DISPLAYING MOVIE POSTER OR PLACEHOLDER IMAGE

          alt={poster_path ? "Movie Poster" : "Placeholder Image"}
          // ALTERNATIVE TEXT FOR THE IMAGE

          // // ADD ONCLICK HANDLER HERE
          // onClick={navigateToMovie}

          // CHANGE THE CURSOR TO INDICATE THE IMAGE IS CLICKABLE
          style={{ cursor: "pointer" }}
        />

        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {/* // DISPLAYING THE MOVIE TITLE */}

          <Card.Text id="movie-desc">{overview ? overview : <span>{fillerText}</span>}</Card.Text>
          {/* // DISPLAYING THE MOVIE OVERVIEW OR FILLER TEXT IF NOT AVAILABLE */}

          <Card.Text>Release Date: {release_date}</Card.Text>
          {/* // DISPLAYING THE MOVIE'S RELEASE DATE */}

          <Card.Text>
            <span className="star-rating">{renderStars()}</span>
            {/* // DISPLAYING THE STAR RATING */}
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>
            {/* // BUTTON TO OPEN THE MODAL */}
            MORE DETAIL...
          </Button>

          {/* // RENDERING THE MOVIEMODAL COMPONENT AND PASSING PROPS FOR MODAL CONTENT */}
          <MovieModal
            show={show}
            handleClose={handleClose}
            title={title}
            poster_path={poster_path}
            release_date={release_date}
            overview={overview}
            API_IMG={API_IMG}
            vote_average={vote_average}
          />
        </Card.Body>
      </Card>
    </>
  );
};

// EXPORTING THE MOVIEBOX COMPONENT FOR USE IN OTHER PARTS OF THE APPLICATION
export default MovieBox;
