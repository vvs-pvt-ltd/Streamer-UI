import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const WatchVideo = () => {
  const videoRef = useRef();

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("videoStream", (stream) => {
      videoRef.current.src = stream;
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <p>Video will appear below when it's available</p>
      <video ref={videoRef} autoPlay></video>
    </div>
  );
};

export default WatchVideo;
