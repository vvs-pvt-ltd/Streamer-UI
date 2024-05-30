import React from "react";
import Cards from "../homeCards/Cards";
import { Link } from "react-router-dom";
import Loader from "../loader";
import NotFoundImg from "../../assets/img/404-not-found.json";
import Lottie from "lottie-react";

const ProfileCards = ({ profilePageData }) => {
  console.log(profilePageData.length);

  if (profilePageData.length === 0)
    return (
      <div className="flex flex-col items-center mt-12 md:mt-0">
        <Lottie className="md:max-w-2xl" animationData={NotFoundImg} />
        <p className="text-xl text-muted-foreground">No Videos Available</p>
      </div>
    );

  return (
    <div className="mt-8">
      {/* <p>Other Streams</p> */}
      {profilePageData.length > 0 ? (
        <div className="grid grid-cols-3 gap-8 pb-10">
          {profilePageData.map((item, index) => (
            <Link to={`/video/${item._id}`}>
              <Cards index={index} item={item} key={item.id} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full text-center pb-36 mt-24">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ProfileCards;

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
