import React, { useEffect, useState } from "react";
import NotificationIcon from "../assets/icons/notifications.svg";
import { Link, useLocation } from "react-router-dom";
import { PopoverDemo } from "./Popover";
import FileUpload from "./FileUpload";
import { Slider } from "./sheetComponent";

const Navbar = () => {
  const location = useLocation();
  const [isUploadVisible, setIsUploadVisible] = useState(false);

  useEffect(() => {
    if (location.pathname === "/upload") setIsUploadVisible(true);
    else setIsUploadVisible(false);
  }, [location.pathname]);

  return (
    <div className="md:px-16 px-6 py-8 text-2xl flex justify-between">
      <div className="md:hidden">
        <Slider />
      </div>

      <Link to="/" className="text-primaryColor font-semibold">
        Stream<span className="text-black font-medium">er</span>
      </Link>
      <div className="flex items-center gap-10">
        {isUploadVisible && <FileUpload />}

        {/* <div className="relative">
          <div className="absolute -top-5 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-sm text-white">
            1
          </div>
          <img src={NotificationIcon} alt="notification" className="w-7" />
        </div> */}
        <PopoverDemo />
      </div>
    </div>
  );
};

export default Navbar;
