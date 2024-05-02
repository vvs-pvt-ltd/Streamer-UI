import { followingSchema } from "../components/following/schema";
import { DataTableDemo } from "../components/following/Table";
import React, { useState } from "react";

const Following = () => {
  const [data, setData] = useState([
    {
      id: 1,
      avatar: "https://picsum.photos/100/100?random=1",
      username: "channelUser1",
      description: "Welcome to Channel 1! We bring you the latest in entertainment.",
      totalVideos: 50,
      totalViews: 10000,
      isActive: true,
      subscribers: 5000,
    },
    {
      id: 2,
      avatar: "https://picsum.photos/100/100?random=2",
      username: "channelUser2",
      description: "Discover amazing content on Channel 2. Don't miss out!",
      totalVideos: 30,
      totalViews: 7500,
      isActive: true,
      subscribers: 3000,
    },
    {
      id: 3,
      avatar: "https://picsum.photos/100/100?random=3",
      username: "channelUser3",
      description: "Channel 3 is your destination for quality entertainment.",
      totalVideos: 80,
      totalViews: 15000,
      isActive: false,
      subscribers: 10000,
    },
  ]);
  return (
    <div>
      <DataTableDemo setData={setData} data={data} columns={followingSchema.columns} />
    </div>
  );
};

export default Following;
