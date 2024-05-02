import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import axios from "axios";
import { useStateValue } from "../../context/StateProvider";
import { LuPencil } from "react-icons/lu";
import { Input } from "../ui/input";

export function AlertDialogDemo({ profileData }) {
  const [{ user }] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  // console.log(videoId);

  const handleClose = () => {
    setIsOpen(false);
  };
  const [name, setName] = useState(profileData.name);
  const [about, setabout] = useState(profileData.about);
  const [coverimage, setcoverimage] = useState(profileData.coverimage);
  const [avatar, setAvatar] = useState(profileData.avatar);
  const [username, setUsername] = useState(profileData.username);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setcoverimage(file);
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <div
          className="rounded-full bg-muted flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <LuPencil className="text-sm" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-h-[650px] max-h-[650px] max-w-6xl grid gap-0 grid-rows-12">
        <AlertDialogHeader className={"row-span-1 grid grid-cols-2"}>
          <AlertDialogTitle>Update Profile</AlertDialogTitle>
          <AlertDialogDescription className="w-full flex justify-end">
            <IoClose
              className="text-2xl cursor-pointer"
              onClick={handleClose}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="overflow-auto px-2 h-full w-full grid items-center justify-center row-span-11 grid-cols-1">
          <div>
            <div className="relative">
              <img
                src={
                  coverimage !== profileData.coverimage
                    ? URL.createObjectURL(coverimage)
                    : coverimage
                }
                className="w-full h-[300px] object-fill"
                alt="thubnail"
              />
              <Input type="file" alt="" onChange={handleFileChange} />
              <div className="mt-3 flex items-center justify-start gap-3">
                <img
                  alt="profilephoto"
                  src={
                    avatar !== profileData.avatar
                      ? URL.createObjectURL(avatar)
                      : avatar
                  }
                  className="rounded-full aspect-square w-20 h-20"
                />
                <Input
                  type="file"
                  alt=""
                  onChange={handleAvatarChange}
                  className="max-w-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 mt-3 gap-4">
              <div>
                <p className="text-sm">Name</p>
                <Input
                  placeholder={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <p className="text-sm">Username</p>
                <Input
                  placeholder={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <p className="text-sm">Description</p>
                <Input
                  placeholder={about}
                  onChange={(e) => setabout(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="grid gap-3">
              <div className="">
                <div className="flex gap-3">
                  <p className="text-xl font-semibold leading-3">
                    {profileData.name}
                  </p>
                </div>
                <p>@{profileData.username}</p>
              </div>

              <div>
                <p className="text-muted-foreground">
                  {profileData.description}
                </p>
              </div>
            </div> */}
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction>
            <Button>Save</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
