import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import trendingIcon from "../assets/icons/trending.svg";
import trendingIconSelected from "../assets/icons/trendingSelected.svg";
import followingIcon from "../assets/icons/following.svg";
import followingIconSelected from "../assets/icons/followingSelected.svg";
import playlistIcon from "../assets/icons/playlist.svg";
import playlistIconSelected from "../assets/icons/playlistSelected.svg";
import yourVideoIcon from "../assets/icons/your-video.svg";
import yourVideoIconSelected from "../assets/icons/your-videoSelected.svg";
import { GoHome } from "react-icons/go";

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState();
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  let location = useLocation();
  // console.log(location);
  useEffect(() => {
    handleButtonClick(location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col gap-2 w-full px-8">
      <Link to="/">
        <div
          className={`w-full flex items-center justify-start gap-3 py-3 px-5 rounded-xl ${
            activeButton === "/" ? "bg-primary text-white" : "text-textColor"
          }`}
        >
          {/* <img src={TrendingIcon} /> */}
          <GoHome className="text-xl" />
          <button>Home</button>
        </div>
      </Link>
      <Link to="/trending">
        <div
          className={`w-full flex gap-3 py-3 px-5 rounded-xl ${
            activeButton === "/trending"
              ? "bg-primary text-white"
              : "text-textColor"
          }`}
        >
          {activeButton === "/trending" ? (
            <img src={trendingIconSelected} />
          ) : (
            <img src={trendingIcon} />
          )}
          <button>Trending</button>
        </div>
      </Link>
      <Link to="/following">
        <div
          className={`w-full flex gap-3 py-3 px-5 rounded-xl ${
            activeButton === "/following"
              ? "bg-primary text-white"
              : "text-textColor"
          }`}
        >
          {activeButton === "/following" ? (
            <img src={followingIconSelected} />
          ) : (
            <img src={followingIcon} />
          )}
          <button>Following</button>
        </div>
      </Link>
      <Link to="/playlist">
        <div
          className={`w-full flex gap-3 py-3 px-5 rounded-xl ${
            activeButton === "/playlist"
              ? "bg-primary text-white"
              : "text-textColor"
          }`}
        >
          {activeButton === "/playlist" ? (
            <img src={playlistIconSelected} />
          ) : (
            <img src={playlistIcon} />
          )}
          <button>Playlist</button>
        </div>
      </Link>
      <Link to="/upload">
        <div
          className={`w-full flex gap-3 py-3 px-5 rounded-xl ${
            activeButton === "/your-videos"
              ? "bg-primary text-white"
              : "text-textColor"
          }`}
        >
          {activeButton === "/your-videos" ? (
            <img src={yourVideoIconSelected} />
          ) : (
            <img src={yourVideoIcon} />
          )}
          <button>Your Videos</button>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
