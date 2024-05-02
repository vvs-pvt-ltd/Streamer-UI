import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Following, Home, Playlist, Trending, YourVideos } from "./pages";
import { Navbar, Sidebar, StreamVideo, WatchVideo } from "./components";
import Demo from "./components/Demo";
import Dummy from "./components/dummy";
import VideoUploader from "./components/VideoUpload";
import Video from "./components/Video";
import FileUpload from "./components/FileUpload";
import UploadPage from "./pages/UploadPage";
import { useStateValue } from "./context/StateProvider";
import ProtectedRoute from "./auth/UserProtectedRoutes";
import axios from "axios";

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [{ user }] = useStateValue();
  // console.log(user)
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.AccessToken}`;

  const checkAuthentication = () => {
    const isLoggedIn = user?.authenticated ? true : false;
    return isLoggedIn
  };

  return (
    <div className="text-textColor">
      <Navbar />

      <div className="md:flex">
        <div className="w-full md:w-[400px]">
          <Sidebar />
        </div>
        <div className="w-full px-6 pr-20">
          <Routes>
            {/* Protect the /upload route */}
            <Route path="/upload" element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            {/* <Route path="/following" element={<Following />} /> */}
            <Route path="/video/:video" element={<Video />} />
            <Route path="/:user/following" element={<Following />} />
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


// const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
//   return isAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

export default App;
