import React, { useEffect, useRef } from "react";
import io from "socket.io-client";


const socket = io.connect('http://localhost:9000/');
const WatchVideo = () => {
  const videoRef = useRef();

  socket.on("View", (view) => {
    console.log("Connected to server", view);
    videoRef.current.src = view;
  });

 

  return (
    <div>
      <p>Video will appear below when it's available</p>
      <video ref={videoRef} autoPlay></video>
    </div>
  );
};

export default WatchVideo;
