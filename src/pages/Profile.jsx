import React, { useEffect, useState } from "react";
import Thumnail from "../assets/wallpaperflare.com_wallpaper.jpg";
import ProfileCards from "../components/profile/ProfileCards";
import { useStateValue } from "../context/StateProvider";
import { AlertDialogDemo } from "../components/profile/alertDemo";
import axios from "axios";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [{ user }] = useStateValue();
  const [isEditable, setIsEditable] = useState(false);
  const location = useLocation();
  const pathname = location.pathname.substring(1);

  const data = {
    name: "Vivek Sahu",
    avatar: "https://picsum.photos/200",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, dolor tempora. Molestiae quibusdam, debitis nam eveniet velit mollitia enim labore quasi voluptatum? Suscipit fugiat magni modi dolor temporibus! Cumque, aliquid! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sint optio hic labore officia eius? Iste, veritatis. Placeat quisquam dolores veniam sed eum minima, omnis veritatis, eius, ipsa totam ad. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab inventore beatae optio voluptate fuga, ea minima, rem sapiente harum nesciunt facilis quaerat amet, veniam voluptatem pariatur quibusdam blanditiis officia nostrum!",
    username: "viveksahu",
    thumbnail: Thumnail,
  };

  const [profileData, setProfileData] = useState({});
  const [fetched, setFetched] = useState(false);
  // console.log(profileData);
  const getData = async () => {
    try {
      const { data } = await axios.get(
        `/user/channel?username=${pathname}`
      );
      console.log(data);
      if (data.status === 200) {
        setProfileData(data.payload);
        setFetched(true);
      }
    } catch (error) {
      toast.error(error.message);
      setFetched(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (user.username === profileData.username) setIsEditable(true);
  }, [user, profileData]);

  return (
    <div>
      {profileData && fetched && (
        <>
          <div className="relative">
            <img
              src={profileData.coverimage}
              className="w-full h-[300px] object-fill"
              alt=""
            />

            <div className="absolute -bottom-10 ">
              <img
                alt="profilephoto"
                src={profileData.avatar}
                className="rounded-full aspect-square w-20 h-20"
              />
            </div>
          </div>
          <div className="grid gap-3">
            <div className="mt-16">
              <div className="flex gap-3">
                <p className="text-xl font-semibold leading-3 capitalize">
                  {profileData.name}
                </p>
                {isEditable && <AlertDialogDemo profileData={profileData} />}
              </div>
              <p>@{profileData.username}</p>
            </div>

            <div>
              <p className="text-muted-foreground">{profileData.about}</p>
            </div>

            <div className="pb-32">
              <ProfileCards profilePageData={profileData.videos} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
