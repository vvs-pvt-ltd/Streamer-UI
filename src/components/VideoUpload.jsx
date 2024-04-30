import { useStateValue } from "../context/StateProvider";
import axios from "axios";
import React, { useState } from "react";

const VideoUpload = () => {
  const [thumbnailPhone, setThumbnailPhone] = useState();
  const [videoPhone, setVideoPhone] = useState();
  const [{ user }] = useStateValue();
  console.log(user);

  const handleVideoUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("title", "Video First");
      // formData.append("description", "Video First Description");
      formData.append("ispublic", true);
      formData.append("thumbnail", thumbnailPhone);
      formData.append("video", videoPhone);
      formData.append("email", "viveksahu1762@gmail.com");

      const res = await axios.post("/video/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => setVideoPhone(e.target.files[0])}
        placeholder="Video"
      />

      <input
        type="file"
        onChange={(e) => setThumbnailPhone(e.target.files[0])}
        placeholder="Video"
      />
      <button onClick={handleVideoUpload}>Submit</button>
    </div>
  );
};

export default VideoUpload;
