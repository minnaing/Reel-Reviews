import React from "react";
import { useNavigate } from "react-router-dom";

function StickyNav() {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/reviews");
  }

  return (
    <div>
      <div className="App-1">
        <div className="sticky-header">
          <h1>Welcome to Movie Explorer</h1>
          <h2>Type in the Search Bar to find the Movies you Love.</h2>
          <p>
            Discover your next favorite movie with our easy-to-use search feature. Just start typing, and let us do the rest!
          </p>
          <p>
            Our navigation bar will stay with you, ensuring seamless browsing through our vast movie library.
          </p>
          <button type="button" style={{ color: "white" }} onClick={handleClick}>
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
}

export default StickyNav;
