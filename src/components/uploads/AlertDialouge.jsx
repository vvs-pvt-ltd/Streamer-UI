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
import { toast } from "sonner";

export function AlertDialogDemo({
  progress,
  handleFileChange,
  handleFileUpload,
  selectedFile,
  setSelectedFile,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [progressCompleted, setProgressCompleted] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const handleSave = () => {
    if (!title || !description || !thumbnail) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const data = {
      title: title,
      description: description,
      isPublic: isPublic,
      thumbnail: thumbnail,
    };

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
      <AlertDialogContent className="max-h-[700px] max-w-6xl grid gap-0 grid-rows-12">
        <AlertDialogHeader className={"row-span-1"}>
          <AlertDialogTitle>
            {selectedFile !== null ? "Details" : "Upload Video"}
          </AlertDialogTitle>
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
