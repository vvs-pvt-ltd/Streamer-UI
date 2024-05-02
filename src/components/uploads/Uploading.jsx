import React from "react";
import AnimationData from "../../assets/demo.lottie";

import { Progress } from "../ui/progress";

const Uploading = ({ progress }) => {
  return (
    <div>
      <dotlottie-player
        src={AnimationData}
        autoplay
        loop
        style={{ height: "400px", width: "auto" }}
      />
      <p className="text-center">Hang on mate! We're uploading your video</p>
      <Progress value={progress} className="w-full mt-6" />
      <p className="text-center mt-3">
        <span className="text-lg font-semibold">{`${Math.floor(
          progress
        )}% `}</span>
        Completed
      </p>
    </div>
  );
};

export default Uploading;
