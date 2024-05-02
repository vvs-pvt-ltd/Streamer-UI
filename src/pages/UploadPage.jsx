import React from "react";

const userUploads = Array.from({ length: 3 }, (_, index) => ({
  title: `Upload ${index + 1}`,
  description: `Description of upload ${index + 1}`,
  thumbnail: "https://picsum.photos/1920/1080",
  ispublic: Math.random() < 0.5, // Randomly assign true or false for ispublic
  video: `videoId${index + 1}`,
  date: new Date(),
}));

console.log(userUploads);

const UploadPage = () => {
  return <div>UploadPage</div>;
};

export default UploadPage;
