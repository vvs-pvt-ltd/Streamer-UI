import React from "react";
import heroImg from "../assets/img/hero.png";
import HomeCards from "../components/HomeCards";

const Home = () => {
  return (
    <div className="w-full">
      <div className="">
        <p className="font-semibold text-2xl">Live Stream</p>
      </div>

      <div className="w-full h-auto aspect-w-16 aspect-h-9 mt-6">
        <img
          src={heroImg}
          alt="heroImg"
          className="object-cover w-full h-full  rounded-[50px]"
        />
      </div>

      <HomeCards />
    </div>
  );
};

export default Home;
