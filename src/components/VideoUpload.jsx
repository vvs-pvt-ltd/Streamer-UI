import { useStateValue } from "../context/StateProvider";
import axios from "axios";
import React, { useState } from "react";

const VideoUpload = () => {
  const [thumbnailPhone, setThumbnailPhone] = useState();
  const [videoPhone, setVideoPhone] = useState();
  const [{ user }] = useStateValue();
  console.log(user);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // if (!file) {
    //   setMessage("Please select a file");
    //   return;
    // }

    const formData = new FormData();
    formData.append("Video", videoPhone);

    try {
      await axios.post("https://kf9319v1-8000.inc1.devtunnels.ms/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });
      // setMessage("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      // setMessage("Error uploading file");
    }
  };

  const handleVideoUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("title", "Video First");
      // formData.append("description", "Video First Description");
      formData.append("ispublic", true);
      formData.append("thumbnail", thumbnailPhone);
      formData.append("Video", videoPhone);

      const res = await axios.post("/video/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default VideoUpload;
