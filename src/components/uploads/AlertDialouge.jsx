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
import { Input } from "../ui/input";
import Lottie from "lottie-react";
import AnimationData from "../../assets/demo.lottie";
// import AnimationData from "../../assets/waiting.json";
import { Progress } from "../ui/progress";
import "@dotlottie/player-component";

export function AlertDialogDemo({
  progress,
  handleFileChange,
  handleFileUpload,
  selectedFile,
  setSelectedFile,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [progressCompleted, setProgressCompleted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (progress === 100) setProgressCompleted(true);
    }, 3200);
  }, [progress]);

//   console.log(progress);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Show Dialog
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-h-[700px] max-w-6xl grid gap-0 grid-rows-6">
        <AlertDialogHeader className={"row-span-1"}>
          <AlertDialogTitle>
            {selectedFile !== null ? "Details" : "Upload Video"}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="h-full w-full grid items-center justify-center pb-20 row-span-5">
          {progress === 0 && !progressCompleted && selectedFile === null && (
            <Input
              type="file"
              onChange={handleFileChange}
              className="max-w-xs"
            />
          )}

          {progress !== 100 && selectedFile !== null && (
            <div>
              <dotlottie-player
                src={AnimationData}
                autoplay
                loop
                style={{ height: "400px", width: "auto" }}
              />
              <p className="text-center">
                Hang on mate! We're uploading your video
              </p>
              <Progress value={progress} className="w-full mt-6" />
              <p className="text-center mt-3">
                <span className="text-lg font-semibold">{`${Math.floor(
                  progress
                )}% `}</span>
                Completed
              </p>
            </div>
          )}

          {progressCompleted && (
            <div>
              <p>Wohoooo ! done</p>
            </div>
          )}
        </div>

        {/* <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
