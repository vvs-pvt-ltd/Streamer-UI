import React, { useRef, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io.connect('http://localhost:9000/');

const Demo = () => {
  const videoRef = useRef();
  let mediaRecorder; 

  const startStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;

        
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = event => {
          if (event.data && event.data.size > 0) {
            socket.emit('Stream', event.data);
          }
        };
        mediaRecorder.start(1000); 
      })
      .catch((error) => console.error("Error accessing webcam:", error));
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      <br />
      <button onClick={startStream}>Start Stream</button>
    </div>
  );
};

export default Demo;
