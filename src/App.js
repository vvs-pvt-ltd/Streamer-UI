import React from "react";
import { Route, Routes } from "react-router-dom";
import { Following, Home, Login, Playlist, Trending, YourVideos } from "./pages";
import { Navbar, Sidebar, StreamVideo, WatchVideo } from "./components";
import Demo from "./components/Demo";
import Dummy from "./components/dummy";
import Video from "./components/Video";
import UploadPage from "./pages/UploadPage";
import { useStateValue } from "./context/StateProvider";
import ProtectedRoute from "./auth/UserProtectedRoutes";
import axios from "axios";
import Profile from "./pages/Profile";

const App = () => {

  const [{ user }] = useStateValue();
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.AccessToken}`;

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
            <Route path="/:user" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/:user/following" element={<Following />} />
            <Route path="/:user/playlist" element={<Playlist />} />
            <Route path="/your-videos" element={<YourVideos />} />
            <Route path="/watch-video" element={<WatchVideo />} />
            <Route path="/stream-video" element={<StreamVideo />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/dummy" element={<Dummy />} />
            <Route path="/login" element={<Login />} />
            
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
