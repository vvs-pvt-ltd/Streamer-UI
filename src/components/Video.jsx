import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoSrc from "../assets/video.mp4";
import { useStateValue } from "../context/StateProvider";
import HomeCards from "./HomeCards";
import axios from "axios";

const Video = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const videoId = path[path.length - 1];
  // const videoId = "662e9363fc2eff8ae57ec94b";
  const { user } = useStateValue();
  const userEmail = "viveksahu1762@gmail.com";
  const [fetched, setFetched] = useState(false);

  const [videoData, setVideoData] = useState(null);
  const fetchVideoData = async () => {
    try {
      const { data } = await axios.get(`/video/videodata?video=${videoId}`);
      // console.log(data);
      if (data.status === 200) {
        setFetched(true);
        setVideoData(data.payload[0]);
        console.log(data);
        // setVideoData()
      }
    } catch (error) {
      console.log(error);
      setFetched(true);
    }
  };

  useEffect(() => {
    try {
      fetchVideoData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const videoData = {
  // title:'ahjcsvjha'
  //   videoUrl: VideoSrc,
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laborum vero eveniet repudiandae incidunt aspernatur libero facere illum ab sequi enim maiores quae, quidem eaque soluta explicabo minima? Eligendi, optio!Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laborum vero eveniet repudiandae incidunt aspernatur libero facere illum ab sequi enim maiores quae, quidem eaque soluta explicabo minima? Eligendi, optio!Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laborum vero eveniet repudiandae incidunt aspernatur libero facere illum ab sequi enim maiores quae, quidem eaque soluta explicabo minima? Eligendi, optio!Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel laborum vero eveniet repudiandae incidunt aspernatur libero facere illum ab sequi enim maiores quae, quidem eaque soluta explicabo minima? Eligendi, optio!",
  //   id: 1,
  //   avatar: "https://picsum.photos/100/100",
  //   email: "viveksahu1762@gmail.com",
  //   name: "Vishal Shah",
  //   userName: "vwakesahu",
  // };

  const msgArray = [
    {
      id: 1,
      avatar: "https://picsum.photos/100/100",
      msg: "Hvsdddddddddcsaaaaaaaaaaaaaaaai",
      email: "vwakesahu",
      name: "Vishal Shah",
    },
    {
      id: 2,
      avatar: "https://picsum.photos/100/100",
      msg: "Its Vivek Sahu",
      email: "viveksahu1762@gmail.com",
      name: "Vivek Sahu",
    },
    {
      id: 2,
      avatar: "https://picsum.photos/100/100",
      msg: "Its Vivek Sahu",
      email: "viveksahu1762@gmail.com",
      name: "Vivek Sahu",
    },
  ];

  const isUser = (email) => {
    if (email === userEmail) return true;
    else return false;
  };

  return (
    <div className="w-full">
      {fetched && videoData !== null ? (
        <div className="w-full">
          <div className="grid w-full md:grid-cols-7 grid-cols-1 gap-4">
            <div className="col-span-5 h-[32rem] flex justify-center">
              <video
                src={`${process.env.REACT_APP_BACKEND_URI}/api/v1/video/view?id=${videoData.video}`}
                autoPlay
                controls
                className="h-full w-full"
              />
            </div>
            <div className="relative h-[32rem] col-span-2">
              <div
                className={`grid gap-3 ${
                  msgArray.length > 8 ? "h-full overflow-auto" : ""
                } p-3`}
              >
                {msgArray.map((msg) =>
                  isUser(msg.email) ? (
                    <div
                      className="w-full flex items-center
                justify-end text-right border px-4 py-2 rounded-se-xl overflow-hidden"
                    >
                      {msg.msg}
                    </div>
                  ) : (
                    <div
                      className="w-full flex flex-wrap items-center
                justify-start gap-4 text-right border px-4 py-2 rounded-se-xl overflow-hidden"
                    >
                      <img
                        src={msg.avatar}
                        className="w-10 h-10 rounded-full"
                        alt={msg.name}
                      />
                      <p className="font-semibold">{msg.name}</p>
                      {msg.msg}
                    </div>
                  )
                )}
              </div>

              <div className="absolute bottom-0 w-full">
                <div className="w-full pt-3 bg-white">
                  <input
                    placeholder="Enter Message"
                    className="w-full py-2 px-4 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/*Video DATA */}
          <div className="bg-gray-200 mt-4 rounded-xl p-6">
            <p className="text-2xl font-semibold">Some Title</p>
            <div className="flex w-full">
              <div className="flex w-full items-center justify-center gap-2">
                <img
                  src={videoData.avatar}
                  alt="profile_image"
                  className="w-16 h-16 rounded-full"
                ></img>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-semibold">{videoData.userName}</p>
                  <button className="px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600">
                    Subscribe
                  </button>
                </div>
              </div>
              <p>{videoData.description}</p>
            </div>
          </div>

          <HomeCards />
        </div>
      ) : (
        "Some error or no data available"
      )}
    </div>
  );
};

export default Video;
