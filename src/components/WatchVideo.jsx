import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import ReactPlayer from "react-player";


const socket = io.connect("http://localhost:9000/");  
const WatchVideo = () => {

  // const [imageSrc, setImageSrc] = useState("");

  let index = 0;
  // const videoRef = useRef();
  // useEffect(() => {
  //   socket.on("view", (stream) => {
  //     console.log("get view");
  //     videoRef.current.srcObject = stream;
  //   });
  // }, []);



  return (
    <div className="">
      <video id="videoplayer" width="650" controls muted="muted" autoplay>
        <source src="http://localhost:9000/video" type="video/mp4" />
      </video>
    </div>
  );
};

export default WatchVideo;