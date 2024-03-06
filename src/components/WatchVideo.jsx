import React, { useEffect, useState } from "react";
import io from "socket.io-client";


const socket = io.connect("http://localhost:9000/");  
const WatchVideo = () => {
  const [imageSrc, setImageSrc] = useState("");
  

  useEffect(() => {
   

    socket.on("View", (image) => {
      setImageSrc(image);
    });

  }, []);

  return (
    <div className="w-[100vw] h-[100vh] md:w-[50vw] md:h-[50vh]">
      <img src={imageSrc}  />
    </div>
  );
};

export default WatchVideo;
