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
import { useStateValue } from "../context/StateProvider";

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState();
  const [{ user }] = useStateValue();
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  let location = useLocation();
  // console.log(location);
  useEffect(() => {
    handleButtonClick(location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col gap-2 w-full md:px-8">
      <Link to="/">
        <div
          className={`w-full flex items-center justify-start gap-3 py-3 px-5 rounded-xl ${
            activeButton === "/" ? "bg-primary text-white" : "text-textColor"
          }`}>
          {/* <img src={TrendingIcon} /> */}
          <GoHome className="text-xl" />
          <button>Home</button>
        </div>
      </Link>

      <Link to="/explore">
        <div
          className={`w-full flex gap-3 py-3 px-5 rounded-xl ${
            activeButton === "/explore"
              ? "bg-primary text-white"
              : "text-textColor"
          }`}>
          {activeButton === "/explore" ? (
            <img src={trendingIconSelected} alt="trending-icon" />
          ) : (
            <img src={trendingIcon} alt="trending-icon" />
          )}
          <button>Explore</button>
        </div>
      </Link>
      <Link to="/trending">
        <div
          className={`w-full flex gap-3 py-3 px-5 rounded-xl ${
            activeButton === "/trending"
              ? "bg-primary text-white"
              : "text-textColor"
          }`}>
          {activeButton === "/trending" ? (
            <img src={trendingIconSelected} alt="trending-icon" />
          ) : (
            <img src={trendingIcon} alt="trending-icon" />
          )}
          <button>Trending</button>
        </div>
      </Link>
      {user.authenticated && (
        <Link to={`/${user.username}/following`}>
          <div
            className={`w-full flex gap-3 py-3 px-5 rounded-xl ${
              activeButton === `/${user.username}/following`
                ? "bg-primary text-white"
                : "text-textColor"
            }`}>
            {activeButton === `/${user.username}/following` ? (
              <img src={followingIconSelected} alt="following-icon" />
            ) : (
              <img src={followingIcon} alt="following-icon" />
            )}
            <button>Subcribed</button>
          </div>
        </Link>
      )}

      {user.authenticated && (
        <Link to={`/${user.username}/playlist`}>
          <div
            className={`w-full flex gap-3 py-3 px-5 rounded-xl ${
              activeButton === `/${user.username}/playlist`
                ? "bg-primary text-white"
                : "text-textColor"
            }`}>
            {activeButton === `/${user.username}/playlist` ? (
              <img src={playlistIconSelected} alt="playlist-icon" />
            ) : (
              <img src={playlistIcon} alt="playlist-icon" />
            )}
            <button>Playlist</button>
          </div>
        </Link>
      )}

      {user.authenticated && (
        <Link to="/upload">
          <div
            className={`w-full flex gap-3 py-3 px-5 rounded-xl ${
              activeButton === "/upload"
                ? "bg-primary text-white"
                : "text-textColor"
            }`}>
            {activeButton === "/upload" ? (
              <img src={yourVideoIconSelected} alt="your-video" />
            ) : (
              <img src={yourVideoIcon} alt="your-video" />
            )}
            <button>My Video</button>
          </div>
        </Link>
      )}

      {!user.authenticated && (
        <Link to="/login">
          <div
            className={`w-full flex gap-3 py-3 px-5 rounded-xl ${
              activeButton === "/login"
                ? "bg-primary text-white"
                : "text-textColor"
            }`}>
            {activeButton === "/login" ? (
              <img src={yourVideoIconSelected} alt="login" />
            ) : (
              <img src={yourVideoIcon} alt="login" />
            )}
            <button>Login</button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
