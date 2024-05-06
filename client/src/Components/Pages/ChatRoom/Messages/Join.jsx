import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const Join = ({ onJoin }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [hasJoined, setHasJoined] = useState(false); // State to manage visibility

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && room) {
      onJoin(name, room);  // This should manage additional logic if needed
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
                <select name="room" value={room} onChange={(e) => setRoom(e.target.value)} id="roomSelect">
                  <option value="">Please select a Room</option>
                  <option value="Room 1">Room 1</option>
                  <option value="Room 2">Room 2</option>
                  {/* Additional room options */}
                </select>
                {/* <i className="fas fa-chevron-down"></i> */}
              </div>
            </div>
          </div>
          <div className="form_buttons">
            <button type="submit" className="btn" id="joinButton">Join</button>
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

