import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io.connect('http://localhost:9000/');
const Demo = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  let frame = [];
  const startstream = () => {
    const canvas = canvasRef.current
    var context = canvas.getContext('2d');



    const draw =async () => {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      // console.log(canvas.toDataURL('image/webp'));
      frame.push(canvas.toDataURL('image/webp'));
      console.log(frame.length);
      if (frame.length === 10) {
        // console.log(frame.length);
        await socket.emit('Stream', frame);
        frame = [];
      }
    }

    const loadCamera = (stream) => {
      videoRef.current.srcObject = stream;
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(loadCamera)

    setInterval(() => {
      draw();
    }, 10);
  };
  return (
    <div>
      <button onClick={startstream}>start stream</button>
      <br />
      <video ref={videoRef} className='w-[100vw] h-[100vh]' autoPlay></video>
      <br />
      <canvas ref={canvasRef} className='hidden' width={1920} height={1080}></canvas>
    </div>
  );
};

export default Demo;
