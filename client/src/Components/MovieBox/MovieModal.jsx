// IMPORTING MODAL AND BUTTON COMPONENTS FROM REACT-BOOTSTRAP FOR UI DESIGN
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// DEFINING THE MOVIEMODAL FUNCTIONAL COMPONENT WITH PROPS PASSED FOR MODAL DATA
const MovieModal = ({
  show,
  handleClose,
  title,
  poster_path,
  release_date,
  overview,
  API_IMG,
  vote_average,
}) => {

  // CALCULATING THE NUMBER OF STARS TO DISPLAY BASED ON THE MOVIE'S VOTE AVERAGE, ASSUMING IT'S ON A 0-10 SCALE
  const stars = Math.round(vote_average / 2);

  // DEFINING A FUNCTION TO RENDER STAR ICONS BASED ON THE CALCULATED NUMBER OF STARS
  const renderStars = () => {

    // CREATE AN EMPTY ARRAY
    const starArray = [];

    // LOOPING TO CREATE AN ARRAY OF SPAN ELEMENTS FOR STARS, FILLED OR EMPTY BASED ON THE MOVIE'S RATING
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
  const placeholderImageUrl = "https://placehold.co/600x400?text=Hello\nWorld";

  // DEFINING A FILLER TEXT FOR USE WHEN NO MOVIE OVERVIEW IS AVAILABLE
  const fillerText = "No description available."; // CUSTOMIZE AS NEEDED

  // RENDERING THE MODAL COMPONENT, SHOWING OR HIDING BASED ON THE 'SHOW' PROP
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title> 
      </Modal.Header>

      <Modal.Body>
        <div id="modal-img">
        {/* DISPLAYING THE MOVIE POSTER OR A PLACEHOLDER IMAGE */}
        <img
          variant="top"
          src={poster_path ? `${API_IMG}${poster_path}` : placeholderImageUrl}
          alt={poster_path ? "Movie Poster" : "Placeholder Image"}
        />
        </div>
        
        {/* DISPLAYING THE MOVIE TITLE AGAIN INSIDE THE MODAL BODY */}
        <h3>{title}</h3> 
        
        {/* RENDERING THE STAR RATINGS */}
        <h4>
          <span className="star-rating">{renderStars()}</span> 
        </h4>
        
        {/* DISPLAYING THE MOVIE'S RELEASE DATE */}
        <h5>Release Date: {release_date}</h5> 
        
        {/* DISPLAYING THE MOVIE OVERVIEW OR A FILLER TEXT IF NOT AVAILABLE */}
        <h6 id="movie-desc">{overview ? overview : <p>{fillerText}</p>}</h6> 
      </Modal.Body>
      
      <Modal.Footer>
        {/* BUTTON TO CLOSE THE MODAL */}
        <Button variant="secondary" onClick={handleClose}> 
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// EXPORTING MOVIEMODAL FOR USE IN OTHER PARTS OF THE APPLICATION
export default MovieModal;
