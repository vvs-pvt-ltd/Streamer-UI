import React, { useEffect, useState } from "react";
import Thumnail from "../assets/wallpaperflare.com_wallpaper.jpg";
import ProfileCards from "../components/profile/ProfileCards";
import { useStateValue } from "../context/StateProvider";
import { AlertDialogDemo } from "../components/profile/alertDemo";
import axios from "axios";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import AvatarImg from "../assets/img/avatar.png";

const Profile = () => {
  const [{ user }] = useStateValue();
  const [isEditable, setIsEditable] = useState(false);
  const location = useLocation();
  const pathname = location.pathname.substring(1);

  const [profileData, setProfileData] = useState({});
  const [fetched, setFetched] = useState(false);
  // console.log(profileData);
  const getData = async () => {
    try {
      const { data } = await axios.get(`/user/channel?username=${pathname}`);
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
            {profileData.coverimage ? (
              <img
                src={profileData.coverimage}
                className="w-full md:h-[300px] h-[100px] object-fill"
                alt="cover"
              />
            ) : (
              <div
                className="w-full bg-gray-100 h-[100px] shadow-sm md:h-[300px] object-fill"
                alt="cover"
              />
            )}

            <div className="absolute -bottom-10 ">
              <img
                alt="profilephoto"
                src={profileData.avatar ? profileData.avatar : AvatarImg}
                className="rounded-full ml-4 aspect-square w-20 h-20"
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
              <p className="text-2xl font-semibold">Videos</p>
              <ProfileCards profilePageData={profileData.videos} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
