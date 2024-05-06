import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import "./ChatRoom.css";

import Chat from "./Messages/Chat";
import Join from "./Messages/Join";

const ChatRoom = () => {
  // INITIALIZE STATE FOR STORING THE SITE LOADED STATUS
  // State for storing the site loaded status
  const [siteLoaded, setSiteLoaded] = useState(false);
  // State to track if the user has joined the room
  const [hasJoined, setHasJoined] = useState(false);

  const { name, room } = useParams(); // Get parameters from the route

  useEffect(() => {
    setSiteLoaded(true);
  }, []);

  // Handler to call when the user joins the room
  const handleJoin = (name, room) => {
    setHasJoined(true); // Update the joined status to true
  };

  return (
    <div className={classNames({ App: true, site_loaded: siteLoaded })}>
      <h1>Welcome to the chat room!</h1>
      {/* Conditionally render Chat only if the user has joined */}
      {hasJoined && <Chat name={name} room={room} />}
      {/* Pass the handleJoin to Join component */}
      <Join onJoin={handleJoin} />
    </div>
  );
};

export default ChatRoom;
