import React from "react";
import NotificationIcon from "../assets/icons/notifications.svg";
import { Link } from "react-router-dom";
import { PopoverDemo } from "./Popover";
const Navbar = () => {
  return (
    <div className="px-16 py-8 text-2xl flex justify-between">
      <Link to="/" className="text-primaryColor font-semibold">
        Stream<span className="text-black font-medium">er</span>
      </Link>
      <div className="flex items-center gap-10">
        <div className="relative">
          <div className="absolute -top-5 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-sm text-white">
            1
          </div>
          <img src={NotificationIcon} alt="notification" className="w-7" />
        </div>
        <PopoverDemo />
      </div>
    </div>
  );
};

export default Navbar;
