import React from "react";
import AvatarImg from "../assets/img/avatar.png";
import NotificationIcon from "../assets/icons/notifications.svg";
const Navbar = () => {
  return (
    <div className="px-16 py-8 text-2xl flex justify-between">
      <p className="text-primaryColor font-semibold">
        Stream<span className="text-black font-medium">er</span>
      </p>
      <div className="flex items-center gap-10">
        <div className="relative">
          <div className="absolute -top-5 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-sm text-white">
            1
          </div>
          <img src={NotificationIcon} alt="notification" className="w-7" />
        </div>
        <img src={AvatarImg} alt="avatar" className="w-11 h-11 rounded-full" />
      </div>
    </div>
  );
};

export default Navbar;
