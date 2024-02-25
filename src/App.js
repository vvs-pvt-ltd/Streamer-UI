import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Following,
  Home,
  Login,
  Playlist,
  Trending,
  YourVideos,
} from "./pages";
import { Navbar, Sidebar } from "./components";
import Demo from "./components/Demo";

const App = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-wrap">
        <div className="w-full md:w-[250px]">
          <Sidebar />
        </div>
        <div className="w-full md:w-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/:user/following" element={<Following />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/your-videos" element={<YourVideos />} />
            <Route path="/demo/*" element={<Demo />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
