import React, { useEffect, useState } from "react";
import NotificationIcon from "../assets/icons/notifications.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PopoverDemo } from "./Popover";
import FileUpload from "./FileUpload";
import { Slider } from "./sheetComponent";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Navbar = () => {
  const location = useLocation();
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (!searchValue) {
      e.preventDefault();
    } else {
      window.location.href = `/explore?paramName=${encodeURIComponent(
        searchValue
      )}`;
    }
  };

  useEffect(() => {
    if (location.pathname === "/upload") setIsUploadVisible(true);
    else setIsUploadVisible(false);
  }, [location.pathname]);

  // /explore?paramName=big

  return (
    <div className="md:px-16 px-6 py-8 text-2xl flex justify-between md:gap-12">
      <div className="md:hidden">
        <Slider />
      </div>

      <div className="flex flex-1 gap-40">
        <Link to="/" className="text-primary font-semibold">
          Stream<span className="font-medium text-foreground">er</span>
        </Link>
        <div className="hidden md:flex gap-3 w-full">
          <Input
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button disabled={searchValue === ""} onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

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
