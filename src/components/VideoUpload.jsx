import React, { useState } from "react";
import axios from "axios";

const VideoUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("video", selectedFile);
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data); // log the response from the server
      setUploadedVideo(response.data); // assuming the server returns some data about the uploaded video
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>
      {uploadedVideo && (
        <div>
          <p>Video Uploaded Successfully!</p>
          <video controls width="500">
            <source
              src={`http://localhost:3000/video/${uploadedVideo}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
