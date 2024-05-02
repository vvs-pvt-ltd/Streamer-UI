import { DataTableDemo } from "../components/userUploads/Table";
import React, { useEffect, useState } from "react";
import { tableData } from "../components/userUploads/schema";
import axios from "axios";
import { toast } from "sonner";

// const userUploads = Array.from({ length: 6 }, (_, index) => ({
//   id: index,
//   title: `Upload ${index + 1}`,
//   description: `Description of upload ${index + 1}`,
//   thumbnail: "https://picsum.photos/1920/1080",
//   ispublic: Math.random() < 0.5, // Randomly assign true or false for ispublic
//   video: `videoId${index + 1}`,
//   createdAt: new Date(),
// }));

const columns = tableData.columns;

const UploadPage = () => {
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState([]);

  const fetchUserUploads = async () => {
    try {
      const { data } = await axios.get("/video/myvideo");
      console.log(data);
      if (data.status === 200) setData(data.payload);
      setFetched(true);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setFetched(true);
      setData([]);
    }
  };

  useEffect(() => {
    fetchUserUploads();
  }, []);

  return (
    <div>
      {fetched && data.length > 0 ? (
        <DataTableDemo data={data} setData={setData} columns={columns} />
      ) : (
        <div>{fetched && data.length === 0 ? "No Data Found" : "Loading"}</div>
      )}
    </div>
  );
};

export default UploadPage;
