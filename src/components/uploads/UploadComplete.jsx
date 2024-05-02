import React, { useRef } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import Switch from "./Switch";
import { Button } from "../ui/button";
import videoFile from "../../assets/ss.mp4";

const UploadComplete = ({
  title,
  handleChange,
  setTitle,
  description,
  setDescription,
  isPublic,
  setIsPublic,
  handleSave,
  thumbnail,
  setThumbnail,
}) => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
  };

  return (
    <div className="w-full h-full grid grid-cols-3 gap-2">
      <div className="col-span-2">
        <p className="text-2xl font-semibold">Details</p>
        <div className="mt-4">
          <Label>Title</Label>
          <Input
            placeholder="Enter Title"
            value={title}
            onChange={(e) => handleChange(e, setTitle)}
          />
        </div>

        <div className="mt-4">
          <Label>Decription</Label>
          <Textarea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => handleChange(e, setDescription)}
          />
        </div>

        <div>
          <Switch
            title={"Is this video need to be availabel public?"}
            id={"is-public"}
            state={isPublic}
            setState={setIsPublic}
          />
        </div>

        <div>
          <div
            className={`aspect-video mt-6 rounded-lg overflow-hidden ${
              thumbnail
                ? "border flex items-center justify-center"
                : "bg-gray-200"
            }`}
          >
            {thumbnail ? (
              <div className="h-full w-full flex items-center justify-center relative">
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="thubnail"
                  className="h-full"
                />

                <Input
                  onChange={handleFileChange}
                  type="file"
                  variant="outline"
                  className="absolute bottom-4 right-4 pr-0 overflow-hidden w-[100px]"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Input
                  onChange={handleFileChange}
                  type="file"
                  variant="outline"
                  className="pr-0 overflow-hidden w-auto cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        <Button className="mt-6" onClick={handleSave}>
          Upload
        </Button>
      </div>
      <div className="col-span-1">
        <video src={videoFile} autoPlay muted loop />
      </div>
    </div>
  );
};

export default UploadComplete;
