import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

// console.log(process.env.REACT_APP_SERVER_URI);
const socket = io.connect(process.env.REACT_APP_SERVER_URI);
const StreamVideo = () => {
  const videoRef = useRef();

  const startStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => console.error("Error accessing webcam:", error));
  };

  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      <br />
      <button onClick={startStream}>Start Stream</button>

    </div>
  );
};

export default StreamVideo;
