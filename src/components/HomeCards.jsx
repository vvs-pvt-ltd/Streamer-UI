import axios from "axios";
import React, { useEffect, useState } from "react";

const HomeCards = () => {
  const [homePageData, setHomePageData] = useState([
    {
      _id: "662c94a10b7e3c3ef4d9890e",
      video: {
        title: "Cooking Pasta Carbonara",
        description:
          "Learn how to cook delicious pasta carbonara with this easy recipe tutorial.",
        thumbnail:
          "https://cdn2.unrealengine.com/ea-sports-fifa-23-is-coming-to-the-epic-games-store-1920x1080-398e19351a82.jpg",
        duration: "15:00",
        views: 5000,
        isPublic: true,
      },
    },
    {
      _id: "662c94a10b7e3c3ef4d9890f",
      video: {
        title: "Introduction to Machine Learning",
        description:
          "An introductory video explaining the basics of machine learning and its applications.",
        thumbnail:
          "https://i.ytimg.com/vi/OMBEtL6-mnU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAYVk-fxTHKrKevvjZ_b1phzUXoLA",
        duration: "00:20:12",
        views: 8000,
        isPublic: true,
      },
    },
    {
      _id: "662c94a10b7e3c3ef4d98910",
      video: {
        title: "Travel Vlog: Exploring Tokyo",
        description:
          "Join us on our journey as we explore the vibrant streets and culture of Tokyo, Japan.",
        thumbnail:
          "https://i.ytimg.com/vi/LVbUNRwpXzw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYqqClUqpfbBgxSlAdsfRDdYGhiw",
        duration: "00:30:00",
        views: 12000,
        isPublic: true,
      },
    },
  ]);

  const fetchHomeScreenData = async () => {
    try {
      const response = await axios.get("/video/");
      // console.log(response);
      if (response.data.status === 200) {
        setHomePageData(response.data.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   fetchHomeScreenData();
  // }, []);

  return (
    <div className="mt-8">
      {/* <p>Other Streams</p> */}
      {homePageData.length > 0 ? (
        <div className="grid grid-cols-3 gap-8 pb-10">
          {homePageData.map((item, index) => (
            <div
              key={item.id}
              className="rounded-[30px] overflow-hidden bg-[#E2E2E2]"
            >
              <img src={item.video.thumbnail} alt={item.video.title} />
              <div className="p-6 pb-12 grid gap-6">
                <p className="text-xl font-bold">{item.video.title}</p>
                <div className="flex items-center gap-3">
                  <img
                    src={`https://randomuser.me/api/portraits/men/${
                      index + 1
                    }.jpg`}
                    alt={item.video.title}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-bold">Kashvi</p>
                    <p>@kasshviplays</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default HomeCards;
