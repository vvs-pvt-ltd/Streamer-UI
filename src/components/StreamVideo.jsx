import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";

const StreamVideo = () => {
  const videoRef = useRef();
  const [isStreaming, setIsStreaming] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_URL);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const startStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        socketRef.current.emit("startStream");
        setIsStreaming(true);
      })
      .catch((error) => console.error("Error accessing webcam:", error));
  };

  const stopStream = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    socketRef.current.emit("stopStream");
    setIsStreaming(false);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      {!isStreaming ? (
        <button onClick={startStream}>Start Stream</button>
      ) : (
        <button onClick={stopStream}>Stop Stream</button>
      )}
    </div>
  );
};

export default StreamVideo;
