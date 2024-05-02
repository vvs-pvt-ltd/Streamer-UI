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
import "@dotlottie/player-component";
import UploadComplete from "./UploadComplete";
import Uploading from "./Uploading";
import SelectFile from "./SelectFile";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import axios from "axios";

export function AlertDialogDemo({
  setProgress,
  videoId,
  progress,
  handleFileChange,
  handleFileUpload,
  selectedFile,
  setSelectedFile,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [progressCompleted, setProgressCompleted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  // console.log(videoId);

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setIsPublic(false);
    setThumbnail(null);
    setIsOpen(false);
    setSelectedFile(null);
    setProgress(0);
    setProgressCompleted(false);
  };

  const handleSave = async () => {
    if (!title || !description || !thumbnail) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    formData.append("ispublic", isPublic);

    const { data } = await axios.put("/video/uploadvideodata", formData);
    console.log(data);
  };

  const handleChange = (e, setfunc) => {
    setfunc(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      if (progress === 100) setProgressCompleted(true);
    }, 3200);
  }, [progress]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Show Dialog
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-h-[650px] max-h-[650px] max-w-6xl grid gap-0 grid-rows-12">
        <AlertDialogHeader className={"row-span-1 grid grid-cols-2"}>
          <AlertDialogTitle>
            {selectedFile !== null ? "Details" : "Upload Video"}
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full flex justify-end">
            <IoClose
              className="text-2xl cursor-pointer"
              onClick={handleClose}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="overflow-auto px-2 h-full w-full grid items-center justify-center row-span-11 grid-cols-1">
          {progress === 0 && !progressCompleted && selectedFile === null && (
            <SelectFile handleFileChange={handleFileChange} />
          )}

          {progress !== 100 && selectedFile !== null && (
            <Uploading progress={progress} />
          )}

          {progressCompleted && (
            <UploadComplete
              videoId={videoId}
              title={title}
              setTitle={setTitle}
              handleChange={handleChange}
              description={description}
              setDescription={setDescription}
              isPublic={isPublic}
              setIsPublic={setIsPublic}
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              handleSave={handleSave}
            />
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
