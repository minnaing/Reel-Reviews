import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Select from "react-select"; // Import react-select

import "./../ChatRoom.css";

const Join = ({ onJoin }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [hasJoined, setHasJoined] = useState(false); // State to manage visibility

  const navigate = useNavigate();

  const options = [
    { value: 'Room 1', label: 'Room 1' },
    { value: 'Room 2', label: 'Room 2' }
    // Add more options as needed
  ];

  const handleChange = (selectedOption) => {
    setRoom(selectedOption.value);
    console.log(`Option selected:`, selectedOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && room) {
      onJoin(name, room); // This should manage additional logic if needed
      navigate(`/chatroom/${name}/${room}`); // Navigates to the chat room
      setHasJoined(true); // Updates state to hide the form
    }
  };

  // Only render if not joined
  if (!hasJoined) {
    return (
      <div className="joinForm" id="joinForm">
        <form onSubmit={handleSubmit} id="form_wrap" className="form_wrap">
          <div className="form_row">
            <div className="form_item">
              <div className="form_input">
                <input
                  type="text"
                  placeholder="Full Name"
                  autoComplete="off"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="fullNameInput"
                />
                <span className="bottom_border"></span>
              </div>
            </div>
          </div>
          <div className="form_row">
            <div className="form_item">
              <div className="form_select">
                <Select
                  name="room"
                  value={options.find((option) => option.value === room)}
                  onChange={handleChange}
                  options={options}
                  placeholder="Please select a Room"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
            </div>
          </div>
          <div className="form_buttons">
            <button type="submit" className="btn" id="joinButton">
              Join
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return null; // Return null to render nothing when user has joined
  }
};

// PropTypes for validation
Join.propTypes = {
  onJoin: PropTypes.func,
};

export default Join;
