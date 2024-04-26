import React from "react";
import { Route, Routes } from "react-router-dom";
import { Following, Home, Playlist, Trending, YourVideos } from "./pages";
import { Navbar, Sidebar, StreamVideo, WatchVideo } from "./components";
import Demo from "./components/Demo";
import Dummy from "./components/dummy";
import VideoUploader from "./components/VideoUpload";

const App = () => {
  return (
    <div className="text-textColor">
      <Navbar />

      <div className="md:flex">
        <div className="w-full md:w-[400px]">
          <Sidebar />
        </div>
        <div className="w-full px-6 pr-20">
          <Routes>
            <Route path="/upload" element={<VideoUploader />} />
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/following" element={<Following />} />
            {/* <Route path="/:user/following" element={<Following />} /> */}
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/your-videos" element={<YourVideos />} />
            <Route path="/watch-video" element={<WatchVideo />} />
            <Route path="/stream-video" element={<StreamVideo />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/dummy" element={<Dummy />} />
            {/* <Route path="/app" ></Route> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
