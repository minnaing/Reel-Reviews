import React from 'react';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types'; // Import PropTypes

const ChatRoomLink = ({ handleClose }) => {
  return (
    <Nav.Link
      as="a"
      href="https://www.brdg2connect.org/login"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClose}
    >
      Chat Room
    </Nav.Link>
  );
};

// Define prop types
ChatRoomLink.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ChatRoomLink;
