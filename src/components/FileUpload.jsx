import React, { useEffect, useState } from "react";
import { AlertDialogDemo } from "./uploads/AlertDialouge";
import axios from "axios";
// import { Button } from "@mui/material";
// import Progress from "../../components/progress";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    if (isButtonClicked) {
      handleFileUpload();
      setIsButtonClicked(false);
    }
  }, [isButtonClicked]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setIsButtonClicked(true);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const chunkSize = 5 * 1024 * 1024; // 5MB (adjust based on your requirements)
    const totalChunks = Math.ceil(selectedFile.size / chunkSize);
    const chunkProgress = 100 / totalChunks;
    let chunkNumber = 0;
    let start = 0;
    let end = 0;
    let is = 1;

    const uploadNextChunk = async () => {
      if (end <= selectedFile.size) {
        const formData = new FormData();
        if (end === 0) formData.append("isstart", true);
        const chunk = selectedFile.slice(start, end);
        formData.append("file", chunk);
        formData.append("chunkNumber", chunkNumber);
        formData.append("totalChunks", totalChunks);
        formData.append("originalname", selectedFile.name);

        axios
          .post("/video/upload", formData)
          .then(({ data }) => {
            console.log({ data });
            if (data.status === 200) {
              setVideoId(data.payload);
            }
            const temp = `Chunk ${
              chunkNumber + 1
            }/${totalChunks} uploaded successfully`;
            setStatus(temp);
            setProgress(Number((chunkNumber + 1) * chunkProgress));
            console.log(temp);
            chunkNumber++;
            start = end;
            end = start + chunkSize;
            uploadNextChunk();
          })
          .catch((error) => {
            console.error("Error uploading chunk:", error);
          });
      } else {
        setProgress(100);
        setSelectedFile(null);
        setStatus("File upload completed");
      }
    };

    uploadNextChunk();
  };

  //   console.log(selectedFile)

  return (
    <AlertDialogDemo
      videoId={videoId}
      progress={progress}
      setProgress={setProgress}
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
      handleFileChange={handleFileChange}
      handleFileUpload={handleFileUpload}
    />
  );
};

export default FileUpload;
