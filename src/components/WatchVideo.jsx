import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io.connect('http://localhost:9000/');

const WatchVideo = () => {
  const videoRef = useRef();

  useEffect(() => {
    const handleStream = (stream) => {
      if (videoRef.current) {
        const blob = new Blob([stream], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        videoRef.current.src = url;
        
        videoRef.current.play().catch(error => console.error('Autoplay error:', error));
      }
    };

    socket.on("View", handleStream);

    return () => {
      socket.off("View", handleStream);
    };
  }, []); 

  return (
    <div>
      <p>Video will appear below when it's available</p>
      <video ref={videoRef} autoPlay controls></video>
    </div>
  );
};

export default WatchVideo;
