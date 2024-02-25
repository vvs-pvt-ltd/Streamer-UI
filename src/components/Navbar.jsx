import React from "react";
import AvatarImg from "../assets/img/avatar.png";
const Navbar = () => {
  return (
    <div className="px-16 py-8 text-2xl flex justify-between">
      <p className="text-primaryColor font-semibold">
        Stream<span className="text-black font-medium">er</span>
      </p>

      <img src={AvatarImg} alt="avatar" className="w-11 h-11 rounded-full" />
    </div>
  );
};

export default Navbar;
