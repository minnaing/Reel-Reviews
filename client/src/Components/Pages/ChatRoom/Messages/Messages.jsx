import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

import "./../ChatRoom.css"; // Import styling

function Messages({ messages, room }) {
  return (
    <div className="messages">
      <div id="list">
        <ul>
          {messages
            .filter((message) => message.room === room)
            .map((message, index) => (
              <li key={index}>
                {message.url ? (
                  <div>
                    <div className="msg">
                      <h4>{message.from}</h4>
                      <div className="body">
                        <a href={message.url} rel="noopener noreferrer" target="_blank">
                          My current location
                        </a>
                      </div>
                    </div>
                    <span className="createdDate">{message.createdDate}</span>
                  </div>
                ) : (
                  <div>
                    <div className="msg">
                      <h4>{message.from}</h4>
                      <div className="body">
                        <p>{message.text}</p>
                      </div>
                    </div>
                    <span className="createdDate">{message.createdDate}</span>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

// Define PropTypes
Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      from: PropTypes.string.isRequired,
      text: PropTypes.string,
      createdDate: PropTypes.string.isRequired,
      room: PropTypes.string.isRequired,
    })
  ).isRequired,
  room: PropTypes.string.isRequired,
};

export default Messages;
