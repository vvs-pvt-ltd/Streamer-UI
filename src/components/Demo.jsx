import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io.connect('http://localhost:9000/');
const Demo = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current
    var context = canvas.getContext('2d');



    const draw = () => {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      console.log(canvas.toDataURL('image/webp'));
      socket.emit('Stream', canvas.toDataURL('image/webp'));
    }

    const loadCamera = (stream) => {
      videoRef.current.srcObject = stream;
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(loadCamera)

    setInterval(() => {
      draw();
    }, 0.00001);
  }, []);
  return (
    <div>
      <video ref={videoRef} className='w-[100vw] h-[100vh]' autoPlay></video>
      
      <canvas ref={canvasRef} className='hidden' width={900} height={700}></canvas>
    </div>
  );
};

export default Demo;