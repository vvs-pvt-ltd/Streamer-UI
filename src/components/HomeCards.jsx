import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./homeCards/Cards";
import { Link } from "react-router-dom";

const HomeCards = () => {
  const [homePageData, setHomePageData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const fetchHomeScreenData = async () => {
    try {
      const response = await axios.get("/video/");
      // console.log(response);
      if (response.data.status === 200) {
        setHomePageData(response.data.payload);
        console.log(response.data.payload);
        setIsFetched(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHomeScreenData();
  }, []);

  if (isFetched && homePageData.length === 0)
    return <div>No Data is available</div>;

  return (
    <div className="mt-8">
      {/* <p>Other Streams</p> */}
      {homePageData.length > 0 && isFetched ? (
        <div className="grid grid-cols-3 gap-8 pb-10">
          {homePageData.map((item, index) => (
            <Link to={`/video/${item._id}`}>
              {console.log(item)}
              <Cards index={index} item={item} key={item.id} />
            </Link>
          ))}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default HomeCards;

//   [
//   {
//     _id: "662c94a10b7e3c3ef4d9890e",
//     video: {
//       title: "Cooking Pasta Carbonara",
//       description:
//         "Learn how to cook delicious pasta carbonara with this easy recipe tutorial.",
//       thumbnail:
//         "https://cdn2.unrealengine.com/ea-sports-fifa-23-is-coming-to-the-epic-games-store-1920x1080-398e19351a82.jpg",
//       duration: "15:00",
//       views: 5000,
//       isPublic: true,
//     },
//   },
//   {
//     _id: "662c94a10b7e3c3ef4d9890f",
//     video: {
//       title: "Introduction to Machine Learning",
//       description:
//         "An introductory video explaining the basics of machine learning and its applications.",
//       thumbnail:
//         "https://i.ytimg.com/vi/OMBEtL6-mnU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAYVk-fxTHKrKevvjZ_b1phzUXoLA",
//       duration: "00:20:12",
//       views: 8000,
//       isPublic: true,
//     },
//   },
//   {
//     _id: "662c94a10b7e3c3ef4d98910",
//     video: {
//       title: "Travel Vlog: Exploring Tokyo",
//       description:
//         "Join us on our journey as we explore the vibrant streets and culture of Tokyo, Japan.",
//       thumbnail:
//         "https://i.ytimg.com/vi/LVbUNRwpXzw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYqqClUqpfbBgxSlAdsfRDdYGhiw",
//       duration: "00:30:00",
//       views: 12000,
//       isPublic: true,
//     },
//   },
// ]
