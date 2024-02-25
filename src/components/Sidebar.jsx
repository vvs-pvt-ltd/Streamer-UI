import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); 
  };

  return (
    <div className="flex flex-col gap-2 w-full px-8">
      <Link to="/">
        <button
          className={`w-full py-2 rounded-xl ${
            activeButton === "home"
              ? "bg-primaryColor text-white"
              : "text-textColor"
          }`}
          onClick={() => handleButtonClick("home")}
        >
          Home
        </button>
      </Link>
      <Link to="/trending">
        <button
          className={`w-full py-2 rounded-xl ${
            activeButton === "trending"
              ? "bg-primaryColor text-white"
              : "text-textColor"
          }`}
          onClick={() => handleButtonClick("trending")}
        >
          Trending
        </button>
      </Link>
      <Link to="/demo/following">
        <button
          className={`w-full py-2 rounded-xl ${
            activeButton === "following"
              ? "bg-primaryColor text-white"
              : "text-textColor"
          }`}
          onClick={() => handleButtonClick("following")}
        >
          Following
        </button>
      </Link>
      <Link to="/playlist">
        <button
          className={`w-full py-2 rounded-xl ${
            activeButton === "playlist"
              ? "bg-primaryColor text-white"
              : "text-textColor"
          }`}
          onClick={() => handleButtonClick("playlist")}
        >
          Playlist
        </button>
      </Link>
      <Link to="/your-videos">
        <button
          className={`w-full py-2 rounded-xl ${
            activeButton === "your-videos"
              ? "bg-primaryColor text-white"
              : "text-textColor"
          }`}
          onClick={() => handleButtonClick("your-videos")}
        >
          Your Videos
        </button>
      </Link>
    </div>
  );
};

export default Sidebar;
